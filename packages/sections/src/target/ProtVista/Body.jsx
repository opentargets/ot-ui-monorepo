import { SectionItem } from "ui";
import { useQuery } from "@apollo/client";

import Description from "./Description";
import { definition } from ".";
import { getUniprotIds } from "../../utils/global";
import ProtVista from "./ProtVista";

import PROTVISTA_QUERY from "./ProtVistaQuery.gql";

function Body({ id: ensemblId, label: symbol, entity }) {
  const variables = { ensemblId };
  const request = useQuery(PROTVISTA_QUERY, { variables });
  return (
    <SectionItem
      definition={definition}
      entity={entity}
      request={{ ...request, data: { [entity]: request.data } }}
      renderDescription={() => <Description symbol={symbol} />}
      renderBody={({ target: { target } }) => {
        const uniprotId = getUniprotIds(target.proteinIds)[0];

        return <ProtVista uniprotId={uniprotId} />;
      }}
    />
  );
}

export default Body;
