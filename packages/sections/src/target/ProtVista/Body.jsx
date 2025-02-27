import { SectionItem, usePlatformApi } from "ui";

import Description from "./Description";
import { definition } from ".";
import { getUniprotIds } from "@ot/utils";
import ProtVista from "./ProtVista";

import PROTVISTA_SUMMARY_FRAGMENT from "./summaryQuery.gql";

function Body({ label: symbol, entity }) {
  const request = usePlatformApi(PROTVISTA_SUMMARY_FRAGMENT);

  return (
    <SectionItem
      definition={definition}
      entity={entity}
      request={{ ...request, data: { [entity]: request.data } }}
      renderDescription={() => <Description symbol={symbol} />}
      showContentLoading={true}
      renderBody={() => {
        const uniprotId = getUniprotIds(request.data?.proteinIds)[0];
        return <ProtVista uniprotId={uniprotId} />;
      }}
    />
  );
}

export default Body;
