import React from "react";
import { Doughnut } from "react-chartjs-2";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from "@material-ui/core";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Gold as GoldIcon, Crypto as CryptoIcon } from "icons";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    padding: theme.spacing(1)
  },
  chartContainer: {
    position: "relative",
    height: "300px"
  },
  stats: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center"
  },
  device: {
    textAlign: "center",
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const AssetAllocation = props => {
  const { className, allocation, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const cash = allocation["cash"];
  const crypto = allocation["crypto"];
  const gold = allocation["gold"];
  const realEstate = allocation["realEstate"];

  const data = {
    datasets: [
      {
        data: [
          cash.toFixed(4),
          crypto.toFixed(4),
          gold.toFixed(4),
          realEstate.toFixed(4)
        ],
        backgroundColor: [
          theme.palette.success.main,
          theme.palette.primary.main,
          "#FFD700",
          "#cb6b6b"
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ["Cash", "Crypto", "Gold", "Real Estate"]
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: "index",
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.backgroundColor,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  const devices = [
    {
      title: "Cash",
      value: cash.toFixed(0),
      icon: <AttachMoneyIcon />,
      color: theme.palette.success.main
    },
    {
      title: "Crypto",
      value: crypto.toFixed(0),
      icon: <CryptoIcon />,
      color: theme.palette.primary.main
    },
    {
      title: "Gold",
      value: gold.toFixed(0),
      icon: <GoldIcon />,
      color: "#FFD700"
    },
    {
      title: "Real Estate",
      value: realEstate.toFixed(0),
      icon: <HomeWorkIcon />,
      color: "#cb6b6b"
    }
  ];

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="Asset Allocation"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={options} />
        </div>
        <div className={classes.stats}>
          {devices.map(device => (
            <div className={classes.device} key={device.title}>
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography variant="body1">{device.title}</Typography>
              <Typography style={{ color: device.color }} variant="h6">
                {device.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

AssetAllocation.propTypes = {
  className: PropTypes.string
};

export default AssetAllocation;
