// store.js
import React, { createContext, useContext, useReducer } from "react";

const StoreContext = createContext();
const initialState = {
  web3: null,
  account: null,
  modals: { connectionPending: false },
  balances: null,
  network: null,
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setWeb3":
      return {
        ...state,
        web3: action.web3
      };
    case "setWallet":
      return {
        ...state,
        wallet: action.wallet
      };
    case "setAccount":
      return {
        ...state,
        account: action.account
      };
    case "setNetwork":
      return {
        ...state,
        network: action.network
      };
    case "setModals":
      return {
        ...state,
        modals: action.modals
      };
    case "setPrices":
      return {
        ...state,
        prices: action.prices
      };
    case "setBalances":
      return {
        ...state,
        balances: action.balances
      };
    case "setMaker":
      return {
        ...state,
        maker: action.maker
      };
    case "setSavingAssets":
      return {
        ...state,
        savingAssets: action.savingAssets
      };
    case "setRealEstate":
      return {
        ...state,
        realEstate: action.realEstate
      };
    case "setInvestments":
      return {
        ...state,
        investments: action.investments
      };
    case "setTxs":
      return {
        ...state,
        txs: action.txs
      };
    case "setError":
      return {
        ...state,
        error: action.error
      };
    case "disconnect":
      return initialState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
