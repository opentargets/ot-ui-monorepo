/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
// import { ApolloProvider } from "@apollo/client";

import { MuiProvider } from "./mui/MuiProvider";
// import client from "./client";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      {/* <ApolloProvider client={client}> */}
      <MuiProvider>
        <RemixBrowser />
      </MuiProvider>
      {/* </ApolloProvider> */}
    </StrictMode>
  );
});
