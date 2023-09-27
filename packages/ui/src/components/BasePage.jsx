import { Helmet } from "react-helmet";
import Footer from "./Footer";
import GlobalSearch from "./GlobalSearch";
import Page from "./Page";

import NavBar from "./NavBar";
import {
  appTitle,
  appDescription,
  appCanonicalUrl,
  externalLinks,
  mainMenuItems,
} from "../constants";

function BasePage({ title, children, description, location }) {
  const composedTitle = `${title ? `${title} | ` : ""} ${appTitle}`;

  return (
    <Page
      header={
        <NavBar
          name="Platform"
          search={<div>s</div>}
          items={mainMenuItems}
        />
      }
      footer={<Footer externalLinks={externalLinks} />}
    >
      <Helmet title={composedTitle}>
        <meta name="description" content={description || appDescription} />
        <link
          rel="canonical"
          href={appCanonicalUrl + (location?.pathname || "")}
        />
      </Helmet>
      {children}
    </Page>
  );
}

export default BasePage;
