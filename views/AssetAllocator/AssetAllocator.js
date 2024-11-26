import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Grid, Button } from "@material-ui/core";
import { useStore } from "../../store/store";
import { usePortfolio } from "../../wallet/hooks/Portfolio";
import { TargetAllocation, TotalToInvest, TargetAssets } from "./components";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const AssetAllocator = props => {
  const classes = useStyles();
  const { className, ...rest } = props;
  const store = useStore();
  const { setSendTx, setAmounts, rebalanced } = usePortfolio();
  const { prices } = store.state;

  //harcode balance to 100 for demo
  let balances = {};
  balances["ETH"] = 100;

  const total = balances["ETH"] * prices["ETH"];
  const assetAllocation = props.location.state.allocation.map(x => x / 100);
  const [allocation, setAllocation] = useState({
    aUSDC: assetAllocation[0] / 2,
    cUSDC: assetAllocation[0] / 2,
    PAXG: assetAllocation[1],
    WBTC: assetAllocation[2] / 2,
    ETH: assetAllocation[2] / 2
  });

  // amounts of different assets to purchase in ETH
  const amounts = {
    aUSDC: balances["ETH"] * allocation["aUSDC"],
    cUSDC: balances["ETH"] * allocation["cUSDC"],
    PAXG: balances["ETH"] * allocation["PAXG"],
    WBTC: balances["ETH"] * allocation["WBTC"]
  };

  if (rebalanced) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalToInvest total={total} eth={balances["ETH"]} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TargetAllocation allocation={allocation} />
          </Grid>
          <Grid item lg={6} sm={6} xl={3} xs={12}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={() => setSendTx(amounts)}
            >
              Yes, get me the that portfolio
            </Button>
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <TargetAssets
              total={total}
              setAllocation={setAllocation}
              allocation={allocation}
              prices={prices}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default AssetAllocator;
