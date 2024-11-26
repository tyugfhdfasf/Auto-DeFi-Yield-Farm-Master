# Defi Asset Manager
Manage portfolios with different asset classes on defi: The goal is to bring concepts like portfolio management/rebalancing from the traditional investment world into Defi. The user can select between model portfolios with different asset allocations and with one click purchase it. Basically, it should be easier for not knowledgable crypto users to invest in a balanced portfolio of different traditional asset classes like Gold and Real Estate and Crypto assets, everything available on defi.
React frontend that is pulling information from different defi protocols and a smart contract that purchases several assets (tokens) on uniswap.

## Install

Install node packages

`npm install`

## Test with local blockchain

First run a fork of the mainnet on your local blockchain

`ganache-cli --fork https://mainnet.infura.io/v3/<YOUR_INFURA_PROJECT_ID> --i 999`

If you don't have an Ifura API key, here's how to get one: https://medium.com/jelly-market/how-to-get-infura-api-key-e7d552dd396f

Deploy PortfolioBalancer smart contract

`npx oz deploy`

Once you have deployed the smart contract on your local blockchain, copy the address into the REACT_APP_PORTFOLIO_ADDRESS environment variable in .env (see .env.example).

Import one of the funded accounts from local blochckain into MetaMask.
Copy private key from local chain into MetaMask.

Connect MetaMask to Localhost 8545.

Set environment variable to get token value using Chainlink Oracle contract for ETH,BTC,DAI
export REACT_APP_ETH_RPC=https://kovan.infura.io/v3/........

Run App on localhost
`npm start`
