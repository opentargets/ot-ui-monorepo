import { useQuery } from "@apollo/client";
import {
  Link,
  SectionItem,
  DataTable,
  ScientificNotation,
  DisplayVariantId
} from "ui";
import { Box, Chip } from "@mui/material";
import { naLabel, defaultRowsPerPageOptions } from "../../constants";
import { definition } from ".";
import Description from "./Description";
import QTL_CREDIBLE_SETS_QUERY from "./QTLCredibleSetsQuery.gql";

function getColumns(id: string, label: string) {

  return [
    {
      id: "leadVariant",
      label: "Lead Variant",
      renderCell: ({ variant }) => {
        if (!variant) return naLabel;
        const { variantId, referenceAllele, alternateAllele } = variant;
        const displayElement = <DisplayVariantId
          variantId={variantId}
          referenceAllele={referenceAllele}
          alternateAllele={alternateAllele}
          expand={false}
        />
        if (variantId === id) {
          return <Box display="flex" alignItems="center" gap={0.5}>
            {displayElement}
            <Chip label="self" variant="outlined" size="small"/>
          </Box>;
        }
        return <Link to={`/variant/${variantId}`}>
          {displayElement}
        </Link>;
      },
      exportValue: ({ variant }) => variant?.variantId,
    },
    {
      id: "study.studyid",
      label: "Study",
      renderCell: ({ study }) => {
        if (!study) return naLabel;
        return <Link to={`../study/${study.studyId}`}>{study.studyId}</Link>
      },
    },
    {
      id: "study.studyType",
      label: "Type",
    },
    // {
    //   id: "gene",
    //   label: "Gene",
    //   renderCell: d => (
    //     <Link to={`/target/${d["target.id"]}`}>
    //       {d["target.approvedSymbol"]}
    //     </Link>
    //   ),
    // },
    // {
    //   id: "tissueCell",
    //   label: "Tissue/Cell",
    //   renderCell: d => (
    //     <Link external to={`https://www.ebi.ac.uk/ols4/search?q=${d.tissueFromSourceId}&ontology=uberon`}>
    //       {d["tissue.label"] || <i>({d["tissue.id"]})</i>}
    //     </Link>
    //   ),
    //   exportLabel: "Tissue/Cell",
    // },
    {
      id: "pValue",
      label: "P-Value",
      comparator: (a, b) =>
        a?.pValueMantissa * 10 ** a?.pValueExponent -
          b?.pValueMantissa * 10 ** b?.pValueExponent,
      sortable: true,
      renderCell: ({ pValueMantissa, pValueExponent }) => {
        if (typeof pValueMantissa !== "number" ||
            typeof pValueExponent !== "number") return naLabel;
        return <ScientificNotation number={[pValueMantissa, pValueExponent]} />;
      },
      exportValue: ({ pValueMantissa, pValueExponent }) => {
        if (typeof pValueMantissa !== "number" ||
            typeof pValueExponent !== "number") return null;
        return `${pValueMantissa}x10${pValueExponent}`;
      },
    },
    {
      id: "beta",
      label: "Beta",
      tooltip: "Beta with respect to the ALT allele",
      renderCell: ({ beta }) => {
        if (typeof beta !== "number") return naLabel;
        return beta.toPrecision(3);
      },
    },
    {
      id: "posteriorProbability",
      label: "Posterior Probability",
      tooltip: "Probability the fixed page variant is in the credible set.",
      comparator: (rowA, rowB) => (
        posteriorProbabilities.get(rowA.locus) -
          posteriorProbabilities.get(rowB.locus)
      ),
      sortable: true,
      renderCell: ({ locus }) => posteriorProbabilities.get(locus)?.toFixed(3) ?? naLabel,
      exportValue: ({ locus }) => posteriorProbabilities.get(locus)?.toFixed(3),
    },
    {
      id: "finemappingMethod",
      label: "Finemapping Method",
    },
    {
      id: "credibleSetSize",
      label: "Credible Set Size",
      comparator: (a, b) => a.locus?.length - b.locus?.length,
      sortable: true,
      renderCell: ({ locus }) => locus?.length ?? naLabel,
      exportValue: ({ locus }) => locus?.length,
    }
  ];
}


type BodyProps = {
  id: string,
  entity: string,
};

function Body({ id, entity }: BodyProps) {
  const variables = {
    variantId: id,
  };

  const request = useQuery(QTL_CREDIBLE_SETS_QUERY, {
    variables,
  });
  
  const columns = getColumns(id, label);
  const rows = request.data.variant.gwasCredibleSets;

  return (
    <SectionItem
      definition={definition}
      entity={entity}
      request={request}
      renderDescription={({ variant }) => (
        <Description
          variantId={variant.variantId}
          referenceAllele={variant.referenceAllele}
          alternateAllele={variant.alternateAllele}
        />
      )}
      renderBody={({ variant }) => {


        // get columns here so get posterior probabilities once - avoids
        // having to find posterior probs inside sorting comparator function
        const posteriorProbabilities = new Map;
        for (const { locus } of variant?.credibleSets || []) {
          const postProb = locus
            ?.find(loc => loc.variant?.variantId === id)
            ?.posteriorProbability
          if (postProb !== undefined) {
            posteriorProbabilities.set(locus, postProb);
          }
        }

        return (
          <DataTable
            dataDownloader
            sortBy="pValue"
            columns={columns}
            rows={rows}
            rowsPerPageOptions={defaultRowsPerPageOptions}
          />
        );
      }}
    />
  );

}

export default Body;