import { Children, ReactNode } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  profileHeaderContainer: {
    marginTop: ".5rem !important",
  },
  profileHeaderSection: {
    marginBottom: "5px !important",
  },
});

type ProfileHeaderProps = {
  children?: ReactNode;
  nColumns?: 1 | 2 | 3 | 4;
};

function ProfileHeader({ children, nColumns = 2 }: ProfileHeaderProps) {
  const classes = useStyles();

  return (
    <Grid className={classes.profileHeaderContainer} container spacing={2}>
      {Children.map(children, child => (
        <Grid className={classes.profileHeaderSection} item xs={12} md={12 / nColumns}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
}

export default ProfileHeader;
