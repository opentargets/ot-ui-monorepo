import { colors, createTheme } from "@mui/material";
import { lighten, darken } from "polished";

const { grey } = colors;

const PRIMARY = "#3489ca";
const SECONDARY = "#ff6350";

const themeConfig = {
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    fontSize: "12px",
  },
  palette: {
    primary: {
      light: lighten(0.2, PRIMARY),
      main: PRIMARY,
      dark: darken(0.2, PRIMARY),
      contrastText: "#fff",
    },
    secondary: {
      light: lighten(0.2, SECONDARY),
      main: SECONDARY,
      dark: darken(0.2, SECONDARY),
      contrastText: "#fff",
    },
    btnGroupActive: {
      light: grey[200],
      main: grey[200],
      dark: grey[200],
      contrastText: "#5A5F5F",
    },
    btnGroupDeactive: {
      light: grey[400],
      main: grey[400],
      dark: grey[400],
      contrastText: "#5A5F5F",
    },
    text: {
      primary: "#5A5F5F",
    },
    // footer: "#2e2d35",
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          border: "1px solid",
          padding: "6px 12px",
          minWidth: "32px",
          minHeight: "32px",
          height: "32px",
          textTransform: "none",
          color: "#5A5F5F",
          borderColor: "rgb(196,196,196)",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          transition: "none",
        },
      },
    },

    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
};

const theme = createTheme(themeConfig);

export default theme;
