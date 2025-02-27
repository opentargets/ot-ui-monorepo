import FACETS_SEARCH_QUERY from "../FacetsQuery.gql";
import { Facet } from "../facetsTypes";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export async function getFacetsData(
  inputValue: string,
  entityToGet: string,
  category: string,
  client: ApolloClient<NormalizedCacheObject>
): Promise<Facet[]> {
  const selectedCategory = category === "All" ? "" : category;
  const variables = {
    queryString: inputValue,
    entityNames: [entityToGet],
    category: selectedCategory,
  };

  const resData = await client.query({
    query: FACETS_SEARCH_QUERY,
    variables,
  });

  return resData.data.facets.hits;
}
