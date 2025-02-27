import { useQuery } from "@apollo/client";

import { Link, SectionItem, PaginationActionsComplete, TableDrawer, OtTable } from "ui";
import { sourceMap, phaseMap } from "@ot/constants";
import { referenceUrls } from "@ot/utils";

import Description from "./Description";
import TherapeuticAreasDrawer from "./TherapeuticAreasDrawer";

import INDICATIONS_QUERY from "./IndicationsQuery.gql";
import { definition } from ".";

const columns = [
  {
    id: "indication",
    label: "Indication",
    enableHiding: false,
    propertyPath: "disease.name",
    renderCell: d => (
      <Link asyncTooltip to={`/disease/${d.disease.id}`}>
        {d.disease.name}
      </Link>
    ),
    width: "38%",
  },
  {
    id: "therapeuticAreas",
    label: "Therapeutic Areas",
    renderCell: d => <TherapeuticAreasDrawer therapeuticAreas={d.disease.therapeuticAreas} />,
    exportValue: d => d.disease.therapeuticAreas.map(therapeuticArea => therapeuticArea.id),
    width: "38%",
  },
  {
    id: "maxPhaseForIndication",
    label: "Max Phase",
    sortable: true,
    width: "10%",
    renderCell: ({ maxPhaseForIndication }) => phaseMap(maxPhaseForIndication),
    filterValue: ({ maxPhaseForIndication }) => phaseMap(maxPhaseForIndication),
  },
  {
    id: "references",
    label: "Source",
    renderCell: ({ references }) => {
      if (!references) return "N/A";

      const referenceList = [];

      references.forEach(reference => {
        reference.ids.forEach(id => {
          referenceList.push({
            name: id,
            url: referenceUrls[reference.source](id),
            group: sourceMap[reference.source],
          });
        });
      });

      if (referenceList.length === 1) {
        return (
          <Link external to={referenceList[0].url}>
            {referenceList[0].group}
          </Link>
        );
      }

      return <TableDrawer entries={referenceList} />;
    },
  },
];

function Body({ id: chemblId, label: name, entity }) {
  const variables = { chemblId };
  const request = useQuery(INDICATIONS_QUERY, { variables });

  return (
    <SectionItem
      definition={definition}
      request={request}
      entity={entity}
      renderDescription={() => <Description name={name} />}
      renderBody={() => {
        return (
          <OtTable
            columns={columns}
            dataDownloader
            dataDownloaderFileStem={`${chemblId}-indications`}
            rows={request.data?.drug.indications.rows}
            showGlobalFilter
            sortBy="maxPhaseForIndication"
            order="desc"
            ActionsComponent={PaginationActionsComplete}
            query={INDICATIONS_QUERY.loc.source.body}
            variables={variables}
            loading={request.loading}
          />
        );
      }}
    />
  );
}

export default Body;
