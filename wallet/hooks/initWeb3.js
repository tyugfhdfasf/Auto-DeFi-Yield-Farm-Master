import { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import Web3 from "web3"; // uses latest 1.x.x version
import Fortmatic from "fortmatic";
import Portis from '@portis/web3';
import { useBalances } from "./Balances";
import { useMakerDAO } from "../../savings/hooks/MakerDAO";
import { useTransactions } from "./transactions";

export function useInitWeb3() {
  const { state, dispatch } = useStore();
  const [wallet, setWallet] = useState(null);

  useBalances();
  useTransactions();
  useMakerDAO();

  let modals = state.modals;

  useEffect(() => {
    async function initWeb3(wallet) {
      if (state.prices) {
        let web3;
        let account = "";
        modals.connectionPending = true;
        dispatch({ type: "setWallet", wallet });
        dispatch({ type: "setModals", modals });
        switch (wallet) {
          //Metamask wallet
          case "MetaMask":
            if (window.ethereum) {
              console.log("Using modern web3 provider.");
              // Get network provider and web3 instance.
              web3 = new Web3(window.ethereum);
              // Use web3 to get the user's accounts.
              await window.ethereum.enable();
              const accounts = await web3.eth.getAccounts();
              account = accounts[0];
            }
            // Legacy dapp browsers, public wallet address always exposed
            else if (window.web3) {
              console.log("Legacy web3 provider. Try updating.");
              web3 = new Web3(window.web3.currentProvider);
            }
            // Non-dapp browsers...
            else {
              console.log(
                "Non-Ethereum browser detected. Need to install metamask"
              );
              //To do handle message to user
            }
            break;
          //Fortmatic wallet
          case "Fortmatic":
            // TODO: Step 2: Setup Developer API Key
            let fm = new Fortmatic("pk_test_2143334B2A521D2F", "kovan");
            web3 = new Web3(fm.getProvider());
            window.web3 = web3;
            let accounts = await fm.user.login();
            account = accounts[0];
            break;
          case "Portis":
            // should the network ID be on mainnet? Kovan?
            // sets up Portis
            // probably should add react environment vars here

            let network;
            // sets network to local ganache network at chain Id 999
            if(process.env.REACT_APP_NETWORK === "ganache") {
              network = {
                nodeUrl: 'http://localhost:8545',
                chainId: parseInt(process.env.REACT_APP_CHAINID),
              };
            }
            else network = process.env.REACT_APP_NETWORK; // just a regular string (ex: "kovan")
            // Create a portis provider 
            const portis = new Portis(process.env.REACT_APP_PORTIS_ID, network);
            web3 = new Web3(portis.provider);
            const portisAccounts = await web3.eth.getAccounts().catch((err) => {console.warn("Portis error: ", err)});
            account = portisAccounts[0];
            break;
        }

        //set network
        const networkId = await web3.eth.net.getId();
        let network;

        switch (networkId) {
          case 42:
            network = "kovan";
            break;
          case 1:
            network = "mainnet";
            break;
          case 999:
            network = "mainnet";
            break;
          default:
            network = "other";
        }

        if (network === "other") {
          dispatch({
            type: "setError",
            error:
              "You are connected to the wrong network. Please change to Main Ethereum Network or Kovan Test Network in Metamask."
          });
        } else {
          dispatch({ type: "setAccount", account });
          dispatch({ type: "setNetwork", network });
          dispatch({ type: "setWeb3", web3 });
        }

        modals.connectionPending = false;
        dispatch({ type: "setModals", modals });
      } else {
        //no prices
        dispatch({
          type: "setError",
          error: "Error reading cyrpto prices. Please try again later."
        });
      }
    }
    if (wallet) {
      initWeb3(wallet);
    }
  }, [wallet]);

  return {
    setWallet
  };
}
