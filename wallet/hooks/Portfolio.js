import { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import Web3 from "web3";

const tokens = require("../../config/tokens/tokens.json");
const portfolioBalancerABI = require("../config/abi/PortfolioBalancer.json");

//Replace with deployed address from local blockchain
//const portfolioBalancerAddress = "0x475c5f2d0683c6870327A56d5A973f37F819e94E";
const portfolioBalancerAddress = process.env.REACT_APP_PORTFOLIO_ADDRESS;

const erc20ABI = require("../../config/abi/erc20.json");

//for aave saving
const {
  aTokenABI,
  aUSDCContract,
  USDCContract
} = require("../../savings/config/aave/aToken.json");

export function usePortfolio(web3, account) {
  const { state, dispatch } = useStore();
  const [sendTx, setSendTx] = useState(null);
  const [rebalanced, setRebalanced] = useState(false);
  const [amounts, setAmounts] = useState("");

  useEffect(() => {
    async function rebalance(web3, account) {
      console.log("Amounts", sendTx);
      const totalEth = web3.utils.toWei(
        (
          sendTx["aUSDC"] +
          sendTx["cUSDC"] +
          sendTx["PAXG"] +
          sendTx["WBTC"]
        ).toString()
      );

      try {
        const portfolioContract = new web3.eth.Contract(
          portfolioBalancerABI,
          portfolioBalancerAddress
        );

        const result = await portfolioContract.methods
          .rebalance(
            web3.utils.toWei((sendTx["aUSDC"] + sendTx["cUSDC"]).toString()),
            "0",
            web3.utils.toWei(sendTx["WBTC"].toString()),
            "0",
            web3.utils.toWei(sendTx["PAXG"].toString()),
            "0"
          )
          .send({ from: account, value: totalEth, gas: 4000000 });

        // const result = await web3.eth.sendTransaction({
        //   from: account,
        //   to: "0x41ed148cE6489c105963e2C038c1435962a05C94",
        //   value: 1000000000000000000
        // });

        console.log(result);
      } catch (err) {
        console.log("Error", err);
      }
      //update balances to export in util function
      let balances = {};
      let wei;
      for (const token of tokens) {
        if (token.address === "0x") {
          //ETH balance
          wei = await web3.eth.getBalance(account);
        } else {
          //ERC20 balance
          let contract = new web3.eth.Contract(
            erc20ABI,
            token.address[state.network]
          );
          wei = await contract.methods.balanceOf(account).call();
        }

        balances[token.symbol] = parseFloat(wei) / 10 ** token.decimals;
      }
      console.log("update balance after tx");
      dispatch({ type: "setBalances", balances });

      //update saving to export in function
      //aave aUSDC
      // let deposits = state.savingAssets.deposits;
      // let debts = state.savingAssets.debts;

      // deposits.totals["USDC"] = deposits.totals["USDC"] + balances["aUSDC"];
      // deposits.savings[0].balance = balances["aUSDC"];
      // deposits.savings[1].balance = balances["cUSDC"];

      // //set sassets in global storage
      // console.log("update saving after tx");
      // dispatch({ type: "setSavingAssets", savingAssets: { deposits, debts } });
    }

    if (state.web3 && state.account && sendTx) {
      rebalance(state.web3, state.account);
      setSendTx(null);
      setRebalanced(true);
    }
  }, [state.web3, state.account, sendTx]);

  return {
    setSendTx,
    setAmounts,
    rebalanced
  };
}
