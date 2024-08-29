import { useQuery } from "@apollo/client";
import {
  Link,
  SectionItem,
  DataTable,
  ScientificNotation,
  DisplayVariantId,
} from "ui";
import { Box, Chip, Typography } from "@mui/material";
import { naLabel, defaultRowsPerPageOptions } from "../../constants";
import { definition } from ".";
import Description from "./Description";
import GWAS_CREDIBLE_SETS_QUERY from "./GWASCredibleSetsQuery.gql";

function getColumns(id: string, posteriorProbabilities: any) {

  return [
    {
      id: "leadVariant",
      label: "Lead Variant",
      renderCell: ({ variant }) => {
        if (!variant) {
          return naLabel;
        }
        const { variantId, referenceAllele, alternateAllele } = variant;
        if (variantId === id) {
          return (
            <Box display="flex" alignItems="center" gap={0.5}>
              <span>
                <DisplayVariantId
                  variantId={variantId}
                  referenceAllele={referenceAllele}
                  alternateAllele={alternateAllele}
                  expand={false}
                />
              </span>
              <Chip label="self" variant="outlined" size="small"/>
            </Box>
          );
        }
        return (
          <Link to={`/variant/${variantId}`}>
            <DisplayVariantId
              variantId={variantId}
              referenceAllele={referenceAllele}
              alternateAllele={alternateAllele}
              expand={false}
            />
          </Link>
        )
      },
      exportValue: ({ variant }) => variant?.variantId,
    },
    {
      id: "trait",
      label: "Trait",
      renderCell: ({ study }) => (
        study?.traitFromSource ? study.traitFromSource : naLabel
      ),
      exportValue: ({ study }) => study?.traitFromSource
    },
    {
      id: "disease",
      label: "Diseases",
      renderCell: ({ study }) => (
        study.diseases?.length > 0 ? (
          <>
            {study.diseases.map(d => (
              <Link key={d.name} to={`../diseases/${d.id}`}>{d.name}</Link>
            ))}
          </>
        ) : (
          naLabel
        )
      ),
      exportValue: ({ study }) => (
        study?.diseases?.map(d => d.name).join(", ")
      ),
    },
    {
      id: "study.studyid",
      label: "Study",
      renderCell: ({ study }) => (
        study ? (
          <Link external to={`https://www.ebi.ac.uk/gwas/studies/${study.studyId}`}>
            {study.studyId}
          </Link>
        ) : (
          naLabel
        )
      ),
    },
    {
      id: "pValue",
      label: "P-Value",
      comparator: (a, b) =>
        a.pValueMantissa * 10 ** a.pValueExponent -
          b.pValueMantissa * 10 ** b.pValueExponent,
      sortable: true,
      renderCell: ({ pValueMantissa, pValueExponent }) => (
        typeof pValueMantissa === "number" &&
          typeof pValueExponent === "number" &&
            <ScientificNotation number={[pValueMantissa, pValueExponent]} />
      ),
      exportValue: ({ pValueMantissa, pValueExponent }) => (
        typeof pValueMantissa === "number" &&
          typeof pValueExponent === "number"
            ? `${pValueMantissa}x10${pValueExponent}`
            : null
      ),
    },
    {
      id: "beta",
      label: "Beta",
      tooltip: "Beta with respect to the ALT allele",
      renderCell: ({ beta }) => beta || beta === 0 ? beta.toPrecision(3) : naLabel,
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
      exportValue: ({ locus }) => posteriorProbabilities.get(locus)?.toFixed(3) ?? naLabel,
    },
    {
      id: "ldr2",
      label: "LD (r2)",
      tooltip: "Linkage disequilibrium with the queried variant",
      renderCell: ({ locus }) => (
        locus?.find(obj => obj.variant?.variantId === id)?.r2Overall?.toFixed(2) ?? naLabel
      ),
      exportValue: ({ locus }) => (
        locus?.find(obj => obj.variant?.variantId === id)?.r2Overall?.toFixed(2)
      ),
    },
    {
      id: "finemappingMethod",
      label: "Finemapping Method",
    },
    {
      id: "topL2G",
      label: "Top L2G",
      tooltip: "Top gene prioritised by our locus-to-gene model",
      renderCell: ({ strongestLocus2gene }) => {
        if (!strongestLocus2gene) return naLabel;
        const { target } = strongestLocus2gene;
        return target ? (
          <Link to={`/target/${target.id}`}>
            {target.approvedSymbol}
          </Link>
        ) : (
          naLabel
        )
      },
      exportValue: ({ strongestLocus2gene }) => (
        strongestLocus2gene?.target.approvedSymbol
      ),
    },
    {
      id: "l2gScore",
      label: "L2G score",
      comparator: (rowA, rowB) => (
        rowA?.strongestLocus2gene.score - rowB?.strongestLocus2gene.score
      ),
      sortable: true,
      renderCell: ({ strongestLocus2gene }) => (
        strongestLocus2gene?.score.toFixed(3)
      ),
      exportValue: ({ strongestLocus2gene }) => strongestLocus2gene?.score
    },
    {
      id: "credibleSetSize",
      label: "Credible Set Size",
      comparator: (a, b) => a.locus?.length - b.locus?.length,
      sortable: true,
      renderCell: ({ locus }) => locus?.length,
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

  const request = useQuery(GWAS_CREDIBLE_SETS_QUERY, {
    variables,
  });
  
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

        // get columns here so can get posterior probabilities once - to avoid
        // having to find posterior probs in sorting comparator function
        const posteriorProbabilities = new Map;
        for (const { locus } of variant.credibleSets) {
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
            columns={getColumns(id, posteriorProbabilities)}
            rows={variant.credibleSets}
            rowsPerPageOptions={defaultRowsPerPageOptions}
            query={GWAS_CREDIBLE_SETS_QUERY.loc.source.body}
            variables={variables}
          />
        );
      }}
    />
  );

}

export default Body;