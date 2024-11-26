import { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import axios from "axios";

//to do: export API key

const {
  base,
  txlist,
  tokenlist,
  apikey
} = require("../../config/api/etherscan.json");

export function useTransactions() {
  const { state, dispatch } = useStore();
  useEffect(() => {
    async function getTransactions() {
      const txResult = await axios.get(
        base[state.network] + txlist + state.account + apikey
      );
      const txs = txResult.data.result;

      const tokenTxResult = await axios.get(
        base[state.network] + tokenlist + state.account + apikey
      );
      const tokenTxs = tokenTxResult.data.result;
      dispatch({ type: "setTxs", txs: { all: txs, token: tokenTxs } });
    }
    if (state.account && state.network) {
      getTransactions();
    }
  }, [state.account, state.network]);
}
