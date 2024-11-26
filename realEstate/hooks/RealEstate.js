import { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import axios from "axios";
import { reduceEachLeadingCommentRange } from "typescript";

const erc20ABI = require("../../config/abi/erc20");
const realTokenURL = "https://api.realt.ch/v1/tokens";
const realTokens = require("../config/token/realTokens.json");

export function useRealEstate() {
  const { state, dispatch } = useStore();

  useEffect(() => {
    async function getRealEstate(web3, account, txs) {
      let wei;
      let totalValue = 0;
      let totalAmount = 0;
      let properties = [];

      //REALT tokens with config tokens
      // for (const realToken of realTokens) {
      //   //ERC20 balance
      //   console.log(realToken.address[state.network]);
      //   console.log(state.network);
      //   const realContract = new web3.eth.Contract(
      //     erc20ABI,
      //     realToken.address[state.network]
      //   );
      //   wei = await realContract.methods.balanceOf(account).call();

      //   const amount = parseFloat(wei) / 10 ** 18;
      //   totalValue = totalValue + amount * realToken.price;
      //   totalAmount = totalAmount + amount;
      //   properties.push({
      //     name: realToken.name,
      //     price: realToken.price,
      //     apy: realToken.apy,
      //     amount,
      //     link: realToken.link
      //   });
      // }

      //REALT tokens with api
      //const result = await axios.get(realTokenURL);
      // for (const token of result.data.tokens) {
      //   if (token.assetPrice && token.totalTokens && token.ethereumContract) {
      //     const contractAddress = token.ethereumContract.toLowerCase();
      //     const price = token.assetPrice / token.totalTokens;
      //     //check if any tokens received
      //     //calculate delta in tokens
      //     const realtFundings = txs.token.filter(
      //       tx => tx.contractAddress === contractAddress
      //     );

      //     if (realtFundings.length > 0) {
      //       //ERC20 balance
      //       const realContract = new web3.eth.Contract(
      //         erc20ABI,
      //         contractAddress
      //       );
      //       wei = await realContract.methods.balanceOf(account).call();

      //       const amount = parseFloat(wei) / 10 ** 18;
      //       totalValue += amount * price;
      //       totalAmount += amount;

      //       properties.push({
      //         name: token.fullName,
      //         price,
      //         apy: token.capRate * 100,
      //         amount,
      //         link: token.marketplace
      //       });
      //     }
      //   }
      // }

      //get USDC rental income
      // const disperseContract = "0xd152f549545093347a162dce210e7293f1452150";
      // const disperseTX = txs.token.filter(tx => tx.from === disperseContract);
      // const totalUSDCfromDisperse = disperseTX.reduce(
      //   (a, b) => a + parseFloat(b.value),
      //   0
      // );
      // const totalIncome = totalUSDCfromDisperse / 10 ** 6;
      const totalIncome = 0;

      dispatch({
        type: "setRealEstate",
        realEstate: { totalIncome, totalAmount, totalValue, properties }
      });
    }

    if (state.web3 && state.account && state.txs) {
      getRealEstate(state.web3, state.account, state.txs);
    }
  }, [state.web3, state.account, state.txs]);
}
