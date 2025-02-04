import { LinksFunction } from "@remix-run/node";

export const getMuiLinks: LinksFunction = () => [
  // Google Fonts for MUI
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
];
