import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider, Drawer } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { Gold as GoldIcon } from "icons";
import HomeWorkIcon from "@material-ui/icons/HomeWork";

import { Profile, SidebarNav, UpgradePlan } from "./components";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)"
    }
  },
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />
    },
    {
      title: "Wallet",
      href: "/wallet",
      icon: <AccountBalanceWalletIcon />
    },
    {
      title: "Savings",
      href: "/savings",
      icon: <AccountBalanceIcon />
    },
    {
      title: "Investments",
      href: "/investments",
      icon: <TrendingUpIcon />
    },
    {
      title: "Real Estate",
      href: "/real-estate",
      icon: <HomeWorkIcon />
    },
    {
      title: "Gold",
      href: "/gold",
      icon: <GoldIcon />
    }
    // {
    //   title: "Exchange",
    //   href: "/typography",
    //   icon: <SwapHorizIcon />
    // },
    // {
    //   title: "Account",
    //   href: "/account",
    //   icon: <AccountBoxIcon />
    // },
    // {
    //   title: "Settings",
    //   href: "/settings",
    //   icon: <SettingsIcon />
    // }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} onClose={onClose}/>
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
