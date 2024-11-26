import { useEffect, useState } from "react";
import { useStore } from "../../store/store";

const tokens = require("../../config/tokens/tokens.json");
const erc20ABI = require("../../config/abi/erc20.json");

export function useBalances(web3, account) {
  const { state, dispatch } = useStore();
  let balances = {};

  useEffect(() => {
    async function getBalances(web3, account) {
      let wei;
      //ERC20 and Ether
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

      dispatch({ type: "setBalances", balances });
    }

    if (state.web3 && state.account) {
      getBalances(state.web3, state.account);
    }
  }, [state.web3, state.account]);
}
