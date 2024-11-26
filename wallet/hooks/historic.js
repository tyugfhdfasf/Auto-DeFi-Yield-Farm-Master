import { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "realEstate/hooks/node_modules/wallet"; // uses latest 1.x.x version

const account = "0x41ed148cE6489c105963e2C038c1435962a05C94";
const ethNetwork =
  "https://mainnet.infura.io/v3/842298ccc2df48c5bca74c273520dab3";
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

const TX_URL_1 =
  "http://api.etherscan.io/api?module=account&action=txlist&address=";
const TX_URL_2 =
  "&startblock=0&endblock=99999999&sort=asc&apikey=UQMDG5738X215YQQY4QK8S7N3D4YGIB65X";

const ERC20_URL_1 =
  "http://api.etherscan.io/api?module=account&action=tokentx&address=";

export function useHistory() {
  useEffect(() => {
    async function getHistory() {
      const result = await axios.get(TX_URL_1 + account + TX_URL_2);
      console.log(result.data.result);
    }
    getHistory();
  }, []);
}
