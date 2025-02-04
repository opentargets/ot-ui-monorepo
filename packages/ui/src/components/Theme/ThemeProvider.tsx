import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { ThemeProvider as MuiThemeProvider, CssBaseline as MuiCssBaseline } from "@mui/material";

import defaultTheme from "./defaultTheme";

function createEmotionCache() {
  return createCache({ key: "css" });
}

export const CssBaseline = MuiCssBaseline;

export function ThemeProvider({
  children,
  theme = defaultTheme,
}: {
  children: React.ReactNode;
  theme?: any;
}) {
  const cache = createEmotionCache();

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </CacheProvider>
  );
}
