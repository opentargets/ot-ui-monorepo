import pkg from "@apollo/client";
import possibleTypes from "./possibleTypes.json";
import config from "./config";

const { ApolloClient, InMemoryCache } = pkg;

console.log("config", config.urlApi);

const client = new ApolloClient({
  uri: config.urlApi,
  ssrMode: false,
  cache: new InMemoryCache(),
  headers: { "OT-Platform": true },
});

export default client;
