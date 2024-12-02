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

## Why Dekstop

1. Enhanced security
For users with high balances, security is a top priority. The program on the computer provides:

- Isolated execution environment:
Local installation reduces the risks of browser-based attacks such as phishing, malicious extensions, or exploits in JavaScript.
Example: The user has no risk if he or she accidentally lands on a fake page of a DeFi platform, which often happens when working through a web browser.

- Hardware Integration:
The program can be linked to hardware wallets (Ledger, Trezor) and use hardware encryption functions to protect keys and sign transactions.

- Local data storage:
The program can store critical data, such as transaction history or security settings, only on the user’s device. This eliminates the need for third-party cloud storage, minimizing the risk of leaks.

2. High performance
An application on a PC can utilize the power of the device more efficiently than a web application:

- Speed of operation:
Local processing reduces latency and does not depend on internet speed as in the case of web versions. This is especially important when analyzing large amounts of data, such as historical returns or complex charts.

-Fast switching between functions:
The user can instantly access key functions such as portfolio management or transactions without having to load each module again.

3. Support for complex computing and analytics
Local PC capacity allows the program:

Perform complex calculations such as yield modeling, risk analysis, or asset value forecasting faster and without the limitations of browser-based solutions.
Create interactive and detailed charts that can include dozens of parameters to analyze DeFi assets.

4. User Experience (UX)
The desktop version of the program can be optimized for professional work:

- Interface customization:
Ability to customize the dashboard to display only those metrics that are important to a particular user. For example, one user can track only staking, while another can track liquidity pools.

- Multitasking:
The user can open multiple windows or tabs of the program at the same time, which simplifies data analysis. For example, one window for portfolio management and another for transaction verification.

5. Offline work
The program may offer an offline mode of operation:

- Analyze data without an internet connection:
The user can view portfolio history, build strategies and prepare transactions for submission while remaining in a secure offline environment.

- Reducing dependence on web services:
The risk of service unavailability due to problems on the ISP side (e.g. server overload) is reduced.

6. Support for multi-network operation
The program can simultaneously interact with multiple blockchain networks (Ethereum, BSC, Polygon, etc.) without having to switch between browser or application tabs. This is especially useful for users working with firewalls and multiple DeFi tools.

7. Consistency with professional style
The program on the PC is perceived as a professional tool, which emphasizes the seriousness of working with assets:

- Association with financial terminals:
An example would be the Bloomberg Terminal analogy, which is used by professional investors to manage traditional assets.

8. Updates and customisation
The program is easy to update, adding new features and adapting it to the growing needs of users.
The ability to integrate modules or APIs allows to customize the solution for corporate clients or large traders.
  
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
