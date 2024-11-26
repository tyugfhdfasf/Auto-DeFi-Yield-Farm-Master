import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Modals from "../../wallet/components/Modals";
import Alert from "@material-ui/lab/Alert";
import { useStore } from "../../store/store";

import { Topbar } from "./components";

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    height: "100%"
  },
  content: {
    height: "100%"
  }
}));

const Minimal = props => {
  const { children } = props;
  const store = useStore();
  const { error } = store.state;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar />
      <Modals />
      {error && <Alert severity="error">{error}</Alert>}
      <main className={classes.content}>{children}</main>
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Minimal;
