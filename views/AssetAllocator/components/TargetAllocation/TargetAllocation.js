import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import { Gold as GoldIcon, Crypto as CryptoIcon } from "icons";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  content: {
    alignItems: "center",
    display: "flex"
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  assets: {
    textAlign: "center",
    padding: theme.spacing(1)
  },
  assetIcon: {
    color: theme.palette.icon
  },
  stats: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center"
  }
}));

const TargetAllocation = props => {
  const { className, allocation, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const assets = [
    {
      title: "Cash",
      value: allocation["aUSDC"] + allocation["cUSDC"],
      icon: <AttachMoneyIcon />,
      color: theme.palette.success.main
    },
    {
      title: "Gold",
      value: allocation["PAXG"],
      icon: <GoldIcon />,
      color: "#FFD700"
    },
    {
      title: "Crypto",
      value: allocation["WBTC"] + allocation["ETH"],
      icon: <CryptoIcon />,
      color: theme.palette.primary.main
    }
    // {
    //   title: "Real Estate",
    //   value: realEstate.toFixed(0),
    //   icon: <HomeWorkIcon />,
    //   color: "#cb6b6b"
    // }
  ];

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              TARGET ASSET ALLOCATION
            </Typography>
            <div className={classes.stats}>
              {assets.map(asset => (
                <div className={classes.assets} key={asset.title}>
                  <span className={classes.assetIcon}>{asset.icon}</span>
                  <Typography variant="body1">{asset.title}</Typography>
                  <Typography style={{ color: asset.color }} variant="h2">
                    {(asset.value * 100).toFixed()}%
                  </Typography>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TargetAllocation.propTypes = {
  className: PropTypes.string
};

export default TargetAllocation;
