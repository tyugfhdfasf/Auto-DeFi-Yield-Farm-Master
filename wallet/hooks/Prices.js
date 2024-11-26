import { useState, useEffect } from "react";
import { useStore } from "../../store/store";
import axios from "axios";
import Web3 from "web3"; 
const tokens = require("../../config/tokens/tokens-gecko.json");

const clinkTokens = require("../../config/tokens/tokens-clink.json");
const aggregatorV3InterfaceABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
//Set REACT_APP_ETH_RPC environment variable to https://kovan.infura.io/.......
let ethWeb3 = null;



//coingecko URLS
const URL_BASE = "https://api.coingecko.com/api/v3/simple/price?ids=";
const URL_CURRENCIES = "&vs_currencies=usd";

//coingecko ids as string
let ids = tokens.map(x => x.coingecko).join("%2C");

console.log(URL_BASE + ids + URL_CURRENCIES);

export function usePrices() {
  let prices = {};
  const { state, dispatch } = useStore();
  useEffect(() => {
    async function getPrices() {
      try {
        const result = await axios.get(URL_BASE + ids + URL_CURRENCIES);
        for (const token of tokens) {
          prices[token.symbol] = parseFloat(
            result.data[token.coingecko]["usd"]
          );
        }
        //Get prices from Chainlink Oracle
        if (!process.env.REACT_APP_ETH_RPC){
           throw new Error('Please set REACT_APP_ETH_RPC=https://kovan.infura.io/..... to get token price through Chainlink Oracle')
        }
        else {
          ethWeb3 = new Web3(process.env.REACT_APP_ETH_RPC);
          for (const token of clinkTokens) {
            let priceFeed = new ethWeb3.eth.Contract(aggregatorV3InterfaceABI, token.address.kovan);
            priceFeed.methods.latestRoundData().call()
              .then((roundData) => {
                  let answer = (roundData.answer) / (10**8);
                  prices[token.symbol] = answer;
              });
          }
        }
        dispatch({ type: "setPrices", prices });
      } catch(error) {
        console.log("Error loading coin prices:", error);
      }
    }
    getPrices();
  }, []);
  return {
    prices
  };
}
