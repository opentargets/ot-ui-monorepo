import { Suspense } from "react";
import { useQuery } from "@apollo/client";
import {
  useLocation,
  useParams,
  Switch,
  Route,
  useRouteMatch,
  Link,
} from "react-router-dom";
import { Box, Tabs, Tab } from "@mui/material";
import { BasePage, ScrollToTop, LoadingBackdrop } from "ui";
import Header from "./Header";
import NotFoundPage from "../NotFoundPage";
import CREDIBLE_SET_PAGE_QUERY from "./CredibleSetPage.gql";
import Profile from "./Profile";

function CredibleSetPage() {
  const location = useLocation();
  const { studyLocusId } = useParams() as { studyLocusId: string };
  const { path } = useRouteMatch();

  const { loading, data } = useQuery(CREDIBLE_SET_PAGE_QUERY, {
    variables: { studyLocusIds: [studyLocusId] },
  });

  if (data && !data?.credibleSets.length) {
    return <NotFoundPage />;
  }

  const credibleSet = data.credibleSets[0];
  const variantId = credibleSet.variant?.id;
  const studyId = credibleSet.study?.studyId;

  return (
    <BasePage
      title={ variantId && studyId
        ? `Credible set around ${variantId} for ${studyId}`
        : studyLocusId
      }
      description={`Annotation information for credible set ${studyLocusId}`}
      location={location}
    >
      <Header
        loading={loading}
        studyLocusId={studyLocusId}
        studyId={studyId}
        variantId={variantId}
      />
      <ScrollToTop />
      <Route
        path="/"
        render={history => (
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={history.location.pathname !== "/" ? history.location.pathname : false}>
              <Tab
                label={<Box sx={{ textTransform: "capitalize" }}>Profile</Box>}
                value={`/credible-set/${studyLocusId}`}
                component={Link}
                to={`/credible-set/${studyLocusId}`}
              />
            </Tabs>
          </Box>
        )}
      />
      <Suspense fallback={<LoadingBackdrop height={11500} />}>
        <Switch>
          <Route exact path={path}>
            <Profile studyLocusId={studyLocusId} />
          </Route>
        </Switch>
      </Suspense>
    </BasePage>
  );
}

export default CredibleSetPage;
