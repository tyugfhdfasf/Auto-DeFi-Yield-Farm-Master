<p align="center"><img width="1920" height="1080" src="image/interface.png" alt="Defi interface" /></p>

# Defi Sentinel
DeFi Sentinel is an application that provides users with tools to manage investments in the decentralized finance (DeFi) ecosystem. It aims to simplify interaction with DeFi, secure assets, and increase returns through analytics and automation.
Manage portfolios with different asset classes on defi: The goal is to bring concepts like portfolio management/rebalancing from the traditional investment world into Defi. The user can select between model portfolios with different asset allocations and with one click purchase it. Basically, it should be easier for not knowledgable crypto users to invest in a balanced portfolio of different traditional asset classes like Gold and Real Estate and Crypto assets, everything available on defi.
React frontend that is pulling information from different defi protocols and a smart contract that purchases several assets (tokens) on DeFi.

It is Your best assistant for investment management in DeFi. Analyze smart contracts, optimize farming, increase returns and protect assets. Connect to Uniswap, Aave and Curve, and more in seconds!

## Install

Mac OS: [Download](https://selenium-finance.gitbook.io/defi-sentinel/download-app)

Windows: [Download](https://selenium-finance.gitbook.io/defi-sentinel/download-app)

## Functionality
1. Dashboard:
- Centralized access to all investments:
User sees all their assets in DeFi (staking, liquidity pools, farming) on one page.

- Display of key metrics:
Yield (APR/APY), asset value, commissions, potential losses (impermanent loss).

- Real-time visualization:
Asset growth charts, historical data and forecasts.

2.Automatic risk scanning:
- Smart contract analysis:
Checking connected DeFi protocols for vulnerabilities, including checking for auditors (CertiK, Quantstamp, etc.).

- Liquidity monitoring:
Alerts on liquidity drops in pools.

- Risk prevention recommendations:
Notifications about dangerous projects, suspicious contracts and high commissions.

3. Return Optimization:
- Portfolio rebalancing:
Recommendations for moving assets between pools and protocols to maximize returns.

- Protocol Aggregation:
Integration with Aave, Curve, Uniswap, PancakeSwap and other popular DeFi platforms.
Automatic migration feature:

- Simplified one-click platform or pool change (e.g., when the APR of the current pool drops).

- Multi-account management (several wallets at the same time).
  
- Professional analytics (charts, forecasts, risk management).
  
- Tax management tools (automatic preparation of reports).
  
4. Transaction Security:

- Multi-signature support:
Ability to validate transactions by multiple devices.

- Key Encryption:
Key protection and automatic notification in case of unauthorized access attempts.

- Real-time notifications:
Notifications of new transactions, withdrawals or suspicious activity.

5. Report Generation:
- Tax reporting:
Download income and loss data to simplify tax filing.

- Personalized analytical reports:
Detailed statistics on each pool/token, transaction history and ROI for a specific period.

## Interface
1. Main panel:

- Visualization of asset allocation (graphs, charts).
- Quick access to key return and risk indicators.
- Customizable widgets to display information that is important to the user.

2. Risk Analysis section:

- Map of connected contracts with their security assessment.
- Color-coded list of threats (low/medium/high risk).
- Ability to instantly disconnect unsafe contracts.

3. Section “Yield and Optimization”:

- Recommendations based on AI algorithms: e.g., move assets to another pool to increase returns.
- Visualization of returns for different periods (day, week, month).

4. Transaction history and reports:

- Chronological action log.
- Export to CSV or PDF format.

5. Settings:

- Connecting wallets (MetaMask, Ledger, Trust Wallet).
- Setting up notifications (Email, Telegram, SMS).
- Security (multisignature settings, backups).
  
## Test with local blockchain

First run a fork of the mainnet on your local blockchain

`ganache-cli --fork https://mainnet.infura.io/v3/<YOUR_INFURA_PROJECT_ID> --i 999`

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
