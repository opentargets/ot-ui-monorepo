import { SummaryItem, usePlatformApi } from "ui";

import { definition } from ".";
import { dataTypesMap } from "../../dataTypes";
// import EVA_SUMMARY from "./EVASummaryQuery.gql";

function Summary() {
  
  // !! THIS IS UGLY BUT AVOIDS ADDING TYPES IN dataType FILE FOR NOW
  type dataTypesMapType = {
    [index: string]: number;
  };
  const dataTypesMapTyped = dataTypesMap as dataTypesMapType; 

  // !! USE PLACEHOLDER REQUEST FOR NOW !!
  // const request = usePlatformApi(EVA_SUMMARY);
  const request = {
    loading: false,
    error: undefined,
    data: true,  // data is not actually used by summary - only cares if there is data
  };

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={() => {}}  // !! renderSummary PROP NOT USED ANYMORE ANYWAY? 
      // renderSummary={({ evaSummary }) => {
      //   const { count } = evaSummary;
      //   return `${count} ${count === 1 ? "entry" : "entries"}`;
      // }}
      subText={dataTypesMapTyped.genetic_association}
    />
  );
}

// !!!!!!!!!!!
// Summary.fragments = {
//   evaSummary: EVA_SUMMARY,
// };

export default Summary;