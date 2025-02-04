import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import { ThemeProvider, SearchProvider, PrivateRoute, ConfigurationProvider } from "ui";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ThemeProvider>
        <RemixBrowser />
      </ThemeProvider>
    </StrictMode>
  );
});
