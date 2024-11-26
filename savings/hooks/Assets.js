import { useEffect } from "react";
import Web3 from "web3";
import { useStore } from "../../store/store";
import axios from "axios";

const erc20ABI = require("../../config/abi/erc20.json");
const tokens = require("../../config/tokens/tokens");

//aave
const {
  LendingPoolAddressesProviderABI,
  LendingPoolAddressesProviderContract
} = require("../config/aave/AddressProvider.json");
const { LendingPoolABI } = require("../config/aave/LendingPool.json");
const {
  aTokenABI,
  aDAIContract,
  DAIContract
} = require("../config/aave/aToken.json");

//dydx
const dydxSoloContract = require("../config/dydx/solo.json");

//compound
const COMPOUND_URL = "https://api.compound.finance/api/v2/account?addresses[]=";
const { cDAIContract } = require("../config/compound/cToken.json");

export function useSavings() {
  const { state, dispatch } = useStore();
  const { web3, network, maker, account, balances } = state;

  //set deposits balances for all tokens to 0
  let initDebts = tokens.reduce((a, b) => ((a[b.symbol] = 0), a), {});
  let initDeposits = tokens.reduce((a, b) => ((a[b.symbol] = 0), a), {});

  useEffect(() => {
    async function getAssets() {
      let deposits = { totals: initDeposits, savings: [] };
      let debts = { totals: initDebts };

      let savings = [];
      let saving = {};
      let balance = 0;
      let totalInterest = 0;
      let apy;
      let wei;
      let ether;
      let result;

      // //get savings in diffferent protocols
      // //get savings inCompund

      // result = await axios.get(COMPOUND_URL + account);

      // if (result.data.accounts.length > 0) {
      //   for (const token of result.data.accounts[0].tokens) {
      //     //we only check CDAI at the moment
      //     if (token.address == cDAIContract[network]) {
      //       //balance
      //       balance = parseFloat(token.supply_balance_underlying.value);
      //       totalInterest = parseFloat(
      //         token.lifetime_supply_interest_accrued.value
      //       );

      //       deposits.totals[token.symbol.substring(1)] = balance;
      //     }
      //   }
      // }

      // //APY for compound
      // const ctoken = new web3.eth.Contract(erc20ABI, cDAIContract[network]);
      // const supplyRatePerBlock = await ctoken.methods
      //   .supplyRatePerBlock()
      //   .call();
      // const ethMantissa = 1e18;
      // const blocksPerDay = 4 * 60 * 24;
      // const daysPerYear = 365;

      // apy =
      //   (Math.pow(
      //     (supplyRatePerBlock / ethMantissa) * blocksPerDay + 1,
      //     daysPerYear - 1
      //   ) -
      //     1) *
      //   100;

      // //saving item
      // saving = {
      //   token: "DAI",
      //   platform: "Compound",
      //   link: "https://compound.finance/",
      //   balance,
      //   apy,
      //   totalInterest
      // };
      // savings.push(saving);

      // //aave aDAI
      // wei = 0;
      // const aDai = new web3.eth.Contract(aTokenABI, aDAIContract[network]);

      // //aDAI balance
      // wei = await aDai.methods.balanceOf(account).call();
      // ether = Web3.utils.fromWei(wei, "ether");
      // balance = parseFloat(ether);
      // deposits.totals["DAI"] = deposits.totals["DAI"] + balance;

      // //initial balance
      // wei = await aDai.methods.principalBalanceOf(account).call();
      // ether = Web3.utils.fromWei(wei, "ether");
      // totalInterest = balance - parseFloat(ether);

      // //APY
      // const lpAddressProviderContract = new web3.eth.Contract(
      //   LendingPoolAddressesProviderABI,
      //   LendingPoolAddressesProviderContract[network]
      // );

      // // Get the latest LendingPool contract address
      // const lpAddress = await lpAddressProviderContract.methods
      //   .getLendingPool()
      //   .call();

      // //lending pool contract
      // const lendingPoolContract = new web3.eth.Contract(
      //   LendingPoolABI,
      //   lpAddress
      // );

      // const aaveResult = await lendingPoolContract.methods
      //   .getReserveData(DAIContract[network])
      //   .call();

      // const aaveAPY = parseFloat(aaveResult.liquidityRate) / 1e25;

      // //saving item
      // saving = {
      //   token: "DAI",
      //   platform: "Aave",
      //   link: "https://aave.com/",
      //   balance,
      //   apy: aaveAPY,
      //   totalInterest
      // };

      //Hardcode for demo to save processing time
      saving = {
        token: "aUSDC",
        platform: "Aave",
        link: "https://aave.com/",
        balance: balances["aUSDC"],
        apy: 2.74,
        totalInterest: 0
      };

      savings.push(saving);

      saving = {
        token: "cUSDC",
        platform: "Compound",
        link: "https://compound.finance/",
        balance: balances["cUSDC"],
        apy: 0.66,
        totalInterest: 0
      };

      savings.push(saving);

      deposits.totals["USDC"] = balances["cUSDC"] + balances["aUSDC"];

      // //dydx protocol

      // balance = 0;
      // totalInterest = 0;

      // const TOKENTX_URL =
      //   "https://api.etherscan.io/api?module=account&action=tokentx&address=";
      // result = await axios.get(TOKENTX_URL + account);
      // const tokenTXs = result.data.result;
      // const soloTX = tokenTXs.filter(tx => tx.to === dydxSoloContract[network]);

      // //some DAI provided to dydx
      // if (soloTX.length > 0) {
      //   //get total DAI put into dydx
      //   const totalWeiToDyDX = soloTX.reduce(
      //     (a, b) => a + parseFloat(b.value),
      //     0
      //   );
      //   //get current DAI balance
      //   const DYDX_ACCOUNT_URL = "https://api.dydx.exchange/v1/accounts/";
      //   const dydxAccountResult = await axios.get(
      //     DYDX_ACCOUNT_URL + maker.proxy
      //   );
      //   const totalBalanceDyDX = parseFloat(
      //     dydxAccountResult.data.accounts[0].balances[3].wei
      //   );
      //   balance = totalBalanceDyDX / 1e18;
      //   totalInterest = balance - totalWeiToDyDX / 1e18;
      //   deposits.totals["DAI"] = deposits.totals["DAI"] + balance;
      // }

      // //get APY
      // const DYDX_MARKET_URL = "https://api.dydx.exchange/v1/markets/3";
      // const dydxMarketResult = await axios.get(DYDX_MARKET_URL);
      // const dydxAPY = parseFloat(dydxMarketResult.data.market.totalSupplyAPY);

      // //add to savings
      // savings.push({
      //   token: "DAI",
      //   platform: "dYdX",
      //   link: "https://dydx.exchange/",
      //   balance,
      //   apy: dydxAPY * 100,
      //   totalInterest
      // });

      deposits.savings = savings;

      //set sassets in global storage
      dispatch({ type: "setSavingAssets", savingAssets: { deposits, debts } });
    }

    if (maker && account && balances) {
      getAssets();
    }
  }, [maker, account, balances]);
}
