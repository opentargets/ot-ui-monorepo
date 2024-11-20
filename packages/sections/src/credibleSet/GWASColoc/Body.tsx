import { ApolloQueryResult, useQuery } from "@apollo/client";
import {
  Link,
  SectionItem,
  DisplayVariantId,
  ScientificNotation,
  OtTable,
  getPage,
  Table,
  useCursorBatchDownloader,
} from "ui";
import { defaultRowsPerPageOptions, naLabel } from "../../constants";
import { definition } from ".";
import Description from "./Description";
import GWAS_COLOC_QUERY from "./GWASColocQuery.gql";
import { mantissaExponentComparator, variantComparator } from "../../utils/comparators";
import { getStudyCategory } from "../../utils/getStudyCategory";
import client from "../../client";
import { ReactElement, useEffect, useState } from "react";

const columns = [
  {
    id: "view",
    label: "Details",
    renderCell: ({ otherStudyLocus }) => {
      if (!otherStudyLocus) return naLabel;
      return <Link to={`./${otherStudyLocus.studyLocusId}`}>view</Link>;
    },
    filterValue: false,
    exportValue: false,
  },
  {
    id: "otherStudyLocus.study.studyId",
    label: "Study ID",
    renderCell: ({ otherStudyLocus }) => {
      const studyId = otherStudyLocus?.study?.studyId;
      if (!studyId) return naLabel;
      return <Link to={`../study/${studyId}`}>{studyId}</Link>;
    },
  },
  {
    id: "otherStudyLocus.study.traitFromSource",
    label: "Trait",
    renderCell: ({ otherStudyLocus }) => {
      const trait = otherStudyLocus?.study?.traitFromSource;
      if (!trait) return naLabel;
      return trait;
    },
  },
  {
    id: "otherStudyLocus.study.publicationFirstAuthor",
    label: "Author",
    renderCell: ({ otherStudyLocus }) => {
      const { projectId, publicationFirstAuthor } = otherStudyLocus?.study || {};
      return getStudyCategory(projectId) === "FINNGEN"
        ? "FinnGen"
        : publicationFirstAuthor || naLabel;
    },
    exportValue: ({ otherStudyLocus }) => {
      const { projectId, publicationFirstAuthor } = otherStudyLocus.study || {};
      getStudyCategory(projectId) === "FINNGEN" ? "FinnGen" : publicationFirstAuthor;
    },
  },
  {
    id: "otherStudyLocus.variant.id",
    label: "Lead Variant",
    comparator: variantComparator,
    sortable: true,
    filterValue: ({ otherStudyLocus }) => {
      const v = otherStudyLocus?.variant;
      return `${v?.chromosome}_${v?.position}_${v?.referenceAllele}_${v?.alternateAllele}`;
    },
    renderCell: ({ otherStudyLocus }) => {
      if (!otherStudyLocus?.variant) return naLabel;
      const { id: variantId, referenceAllele, alternateAllele } = otherStudyLocus.variant;
      return (
        <Link to={`/variant/${variantId}`}>
          <DisplayVariantId
            variantId={variantId}
            referenceAllele={referenceAllele}
            alternateAllele={alternateAllele}
            expand={false}
          />
        </Link>
      );
    },
    exportValue: ({ otherStudyLocus }) => otherStudyLocus?.variant?.id,
  },
  {
    id: "pValue",
    label: "P-Value",
    comparator: ({ otherStudyLocus: a }, { otherStudyLocus: b }) =>
      mantissaExponentComparator(
        a?.pValueMantissa,
        a?.pValueExponent,
        b?.pValueMantissa,
        b?.pValueExponent
      ),
    sortable: true,
    filterValue: false,
    renderCell: ({ otherStudyLocus }) => {
      const { pValueMantissa, pValueExponent } = otherStudyLocus ?? {};
      if (typeof pValueMantissa !== "number" || typeof pValueExponent !== "number") return naLabel;
      return <ScientificNotation number={[pValueMantissa, pValueExponent]} />;
    },
    exportValue: ({ otherStudyLocus }) => {
      const { pValueMantissa, pValueExponent } = otherStudyLocus ?? {};
      if (typeof pValueMantissa !== "number" || typeof pValueExponent !== "number") return null;
      return `${pValueMantissa}x10${pValueExponent}`;
    },
  },
  {
    id: "numberColocalisingVariants",
    label: "Colocalising Variants (n)",
    filterValue: false,
    comparator: (a, b) => a?.numberColocalisingVariants - b?.numberColocalisingVariants,
    sortable: true,
  },
  {
    id: "colocalisationMethod",
    label: "Colocalisation Method",
  },
  {
    id: "h3",
    label: "H3",
    tooltip: (
      <>
        Posterior probability that the signals <b>do not</b> colocalise
      </>
    ),
    filterValue: false,
    comparator: (a, b) => a?.h3 - b?.h3,
    sortable: true,
    renderCell: ({ h3 }) => {
      if (typeof h3 !== "number") return naLabel;
      return h3.toPrecision(3);
    },
  },
  {
    id: "h4",
    label: "H4",
    tooltip: "Posterior probability that the signals colocalise",
    filterValue: false,
    comparator: (a, b) => a?.h4 - b?.h4,
    sortable: true,
    renderCell: ({ h4 }) => {
      if (typeof h4 !== "number") return naLabel;
      return h4.toPrecision(3);
    },
  },
  {
    id: "clpp",
    label: "CLPP",
    filterValue: false,
    comparator: (a, b) => a?.clpp - b?.clpp,
    sortable: true,
    renderCell: ({ clpp }) => {
      if (typeof clpp !== "number") return naLabel;
      return clpp.toPrecision(3);
    },
  },
];

type BodyProps = {
  studyLocusId: string;
  entity: string;
};

type fetchGwasColocProps = {
  studyLocusId: string;
  page: number;
  size: number;
  // freeTextQuery: string;
};

function fetchGwasColoc({
  studyLocusId,
  page,
  size,
}: // freeTextQuery,
fetchGwasColocProps): Promise<ApolloQueryResult<any>> {
  return client.query({
    query: GWAS_COLOC_QUERY,
    variables: {
      studyLocusIds: [studyLocusId],
      index: page,
      size,
      // freeTextQuery,
    },
  });
}

function Body({ studyLocusId, entity }: BodyProps): ReactElement {
  const variables = {
    studyLocusIds: [studyLocusId],
  };

  const [initialLoading, setInitialLoading] = useState(true); // state variable to keep track of initial loading of rows
  const [loading, setLoading] = useState(false); // state variable to keep track of loading state on page chage
  const [count, setCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setPageSize] = useState(10);

  useEffect(() => {
    let isCurrent = true;

    fetchGwasColoc({ studyLocusId, page, size }).then(res => {
      const { cursor: newCursor, rows: newRows, count: newCount } = res.data.credibleSets;
      if (isCurrent) {
        setInitialLoading(false);
        // setCursor(newCursor);
        setCount(newCount);
        setRows(newRows);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  const handleRowsPerPageChange = newPageSize => {
    const newPageSizeInt = Number(newPageSize);
    if (newPageSizeInt > rows.length && page !== 0) {
      setLoading(true);
      fetchGwasColoc({ studyLocusId, page, size }).then(res => {
        const { cursor: newCursor, rows: newRows } = res.data.credibleSets;
        setRows([...rows, ...newRows]);
        setLoading(false);
        // setCursor(newCursor);
        setPage(0);
        setPageSize(newPageSizeInt);
      });
    } else {
      setPage(0);
      setPageSize(newPageSizeInt);
    }
  };

  const handlePageChange = newPage => {
    const newPageInt = Number(newPage);
    if (size * newPageInt + size > rows.length && page !== 0) {
      setLoading(true);
      fetchGwasColoc({ studyLocusId, page, size }).then(res => {
        const { cursor: newCursor, rows: newRows } = res.data.credibleSets;
        setRows([...rows, ...newRows]);
        setLoading(false);
        // setCursor(newCursor);
        setPage(0);
      });
    } else {
      setPage(newPageInt);
    }
  };

  const getWholeDataset = useCursorBatchDownloader(GWAS_COLOC_QUERY, variables, `data.disease.eva`);

  return (
    <SectionItem
      definition={definition}
      entity={entity}
      showContentLoading={true}
      request={{
        loading: initialLoading,
        data: { [entity]: { eva: { rows, count } } },
      }}
      renderDescription={() => <Description />}
      renderBody={() => (
        <Table
          loading={loading}
          columns={columns}
          rows={getPage(rows, page, size)}
          rowCount={count}
          rowsPerPageOptions={defaultRowsPerPageOptions}
          page={page}
          pageSize={size}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          // onSortBy={handleSortBy}
          query={GWAS_COLOC_QUERY.loc.source.body}
          dataDownloader
          dataDownloaderRows={getWholeDataset}
          // dataDownloaderColumns={exportColumns}
          dataDownloaderFileStem="credible-set-gwas-coloc"
          variables={variables}
        />
      )}
    />
  );
}

export default Body;
