import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import { useStore } from "../../../../store/store";

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "none"
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  title: {
    flexGrow: 1,
    color: theme.palette.white
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const { dispatch } = useStore();

  const signOut = () => {
    dispatch({ type: "disconnect" });
  };

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      style={{ background: "#333" }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onSidebarOpen}>
          <MenuIcon />
        </IconButton>
        <RouterLink to="/">
          <Typography variant="h2" className={classes.title}>
            DeFi Dashboard
          </Typography>
        </RouterLink>
        <div className={classes.flexGrow} />
        <IconButton
          className={classes.signOutButton}
          color="inherit"
          onClick={signOut}
        >
          <InputIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
