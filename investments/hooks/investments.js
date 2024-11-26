import { useEffect, useState } from "react";
import { useStore } from "../../store/store";

const poolABI = require("../config/uniswap/abi.json");
const tokens = require("../../config/tokens/tokens");
const pools = require("../config/uniswap/pools.json");

export function useInvestments() {
  const { state, dispatch } = useStore();
  let initBalances = tokens.reduce((a, b) => ((a[b.symbol] = 0), a), {});

  useEffect(() => {
    async function getUniswaps(web3, account, txs) {
      let investments = { totals: initBalances, pools: [] };

      // for (const pool of pools) {
      //   const poolAddress = pool.address[state.network];

      //   if (poolAddress !== "0x") {
      //     const poolContract = new web3.eth.Contract(poolABI, poolAddress);

      //     const poolToken = await poolContract.methods
      //       .balanceOf(account)
      //       .call();

      //     //get share of pool (pool token and underlying tokens)
      //     const poolTotalSupply = await poolContract.methods
      //       .totalSupply()
      //       .call();
      //     const poolReserves = await poolContract.methods.getReserves().call();
      //     const poolShare = parseFloat(poolToken) / parseFloat(poolTotalSupply);
      //     const tokenShare = [
      //       parseFloat(poolReserves[0]) * poolShare,
      //       parseFloat(poolReserves[1]) * poolShare
      //     ];

      //     const token1 = tokens.filter(
      //       token => token.symbol === pool.token1
      //     )[0];
      //     const token2 = tokens.filter(
      //       token => token.symbol === pool.token2
      //     )[0];

      //     const balance1 = tokenShare[0] / 10 ** token1.decimals;
      //     const balance2 = tokenShare[1] / 10 ** token2.decimals;

      //     //set to total investmet balances
      //     investments.totals[pool.token1] += balance1;
      //     investments.totals[pool.token2] += balance2;

      //     //calculate delta in tokens
      //     const poolFundings = txs.token.filter(tx => tx.to === poolAddress);

      //     let totalFundingETH = 0;
      //     let totalFundingToken = 0;

      //     for (const funding of poolFundings) {
      //       totalFundingETH += parseFloat(
      //         txs.all.filter(tx => tx.hash === funding.hash)[0].value
      //       );
      //       totalFundingToken += parseFloat(funding.value);
      //     }

      //     let delta1 = 0;
      //     let delta2 = 0;

      //     if (pool.token1 === "ETH") {
      //       //ETH delta
      //       delta1 = balance1 - totalFundingETH / 10 ** 18;
      //       //Token delta
      //       delta2 = balance2 - totalFundingToken / 10 ** token2.decimals;
      //     } else {
      //       //ETH delta
      //       delta2 = balance2 - totalFundingETH / 10 ** 18;
      //       //Token delta
      //       delta1 = balance1 - totalFundingToken / 10 ** token1.decimals;
      //     }

      //     investments.pools.push({
      //       platform: "Uniswap",
      //       token1: pool.token1,
      //       token2: pool.token2,
      //       balance1,
      //       balance2,
      //       delta1,
      //       delta2
      //     });
      //   }
      // }
      dispatch({
        type: "setInvestments",
        investments
      });
    }
    if (state.web3 && state.account && state.txs) {
      getUniswaps(state.web3, state.account, state.txs);
    }
  }, [state.web3, state.account, state.txs]);
}
