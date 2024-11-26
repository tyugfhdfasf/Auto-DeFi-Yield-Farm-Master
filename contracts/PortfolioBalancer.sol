pragma solidity 0.6.0;

//openzeppelin
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

interface IUniswapV2Router02 {
    function factory() external pure returns (address);

    function WETH() external pure returns (address);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    )
        external
        returns (
            uint256 amountA,
            uint256 amountB,
            uint256 liquidity
        );

    function addLiquidityETH(
        address token,
        uint256 amountTokenDesired,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    )
        external
        payable
        returns (
            uint256 amountToken,
            uint256 amountETH,
            uint256 liquidity
        );

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB);

    function removeLiquidityETH(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountToken, uint256 amountETH);

    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountA, uint256 amountB);

    function removeLiquidityETHWithPermit(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountToken, uint256 amountETH);

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactETHForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function swapTokensForExactETH(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactTokensForETH(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapETHForExactTokens(
        uint256 amountOut,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountETH);

    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountETH);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable;

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;

    function quote(
        uint256 amountA,
        uint256 reserveA,
        uint256 reserveB
    ) external pure returns (uint256 amountB);

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountOut);

    function getAmountIn(
        uint256 amountOut,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountIn);

    function getAmountsOut(uint256 amountIn, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts);

    function getAmountsIn(uint256 amountOut, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts);
}

interface IERC20 {
    /**
     * @dev Returns the number of decimals.
     */
    function decimals() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

interface CErc20 {
    function mint(uint256) external returns (uint256);

    function exchangeRateCurrent() external returns (uint256);

    function supplyRatePerBlock() external returns (uint256);

    function redeem(uint256) external returns (uint256);

    function redeemUnderlying(uint256) external returns (uint256);
}

interface LendingPoolAddressesProvider {
    function getLendingPool() external view returns (address);

    function getLendingPoolCore() external view returns (address);
}

interface LendingPool {
    function deposit(
        address _reserve,
        uint256 _amount,
        uint16 _referralCode
    ) external payable;
}

contract PortfolioBalancer is ReentrancyGuard, Ownable {
    using SafeMath for uint256;

    bool private stopped = false;

    address wethTokenAddress = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    // address daiTokenAddress = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    // address cdaiTokenAddress = 0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643;
    // address adaiTokenAddress = 0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d;
    //USDC coin
    address daiTokenAddress = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    address cdaiTokenAddress = 0x39AA39c021dfbaE8faC545936693aC917d5E7563;
    address adaiTokenAddress = 0x9bA00D6856a4eDF4665BcA2C2309936572473B7E;
    address wbtcTokenAddress = 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599;
    address paxgTokenAddress = 0x45804880De22913dAFE09f4980848ECE6EcbAf78;

    IUniswapV2Router02 public uniswapV2Router = IUniswapV2Router02(
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
    );

    constructor() public {}

    /**
    @notice This function is used to buy different ERC20 token on uniswap excahnge
    @param _amountInETHForDAI The amount of ETH to pay for DAI
    @param _amountOutMinDAI The minimum amount of DAI
    @param _amountInETHForWBTC The amount of ETH to pay for WBTC
    @param _amountOutMinWBTC The minimum amount of WBTC
    @param _amountInETHForPAXG The amount of ETH to pay for WBTC
    @param _amountOutMinPAXG he minimum amount of WBTC coins
    @return Amount of LP bought
     */

    function rebalance(
        uint256 _amountInETHForDAI,
        uint256 _amountOutMinDAI,
        uint256 _amountInETHForWBTC,
        uint256 _amountOutMinWBTC,
        uint256 _amountInETHForPAXG,
        uint256 _amountOutMinPAXG
    ) public payable nonReentrant returns (uint256) {
        address[] memory path = new address[](2);

        path[0] = wethTokenAddress;
        //buy DAI
        path[1] = daiTokenAddress;

        uint256[] memory amountsDAI = uniswapV2Router
            .swapExactETHForTokens
            .value(_amountInETHForDAI)(
            _amountOutMinDAI,
            path,
            address(this),
            now + 280
        );

        //calculate DAI amounts
        //uint256 amount = amountsDAI[0];
        uint256 amount = IERC20(daiTokenAddress).balanceOf(address(this));
        uint256 adaiAmount = amount.div(2);
        uint256 cdaiAmount = amount.sub(adaiAmount);

        // //now put DAI into AAve
        // // Retrieve LendingPool address
        LendingPoolAddressesProvider provider = LendingPoolAddressesProvider(
            address(0x24a42fD28C976A61Df5D00D0599C34c4f90748c8)
        ); // mainnet address, for other addresses: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
        LendingPool lendingPool = LendingPool(provider.getLendingPool());

        uint16 referral = 0;

        // // Approve LendingPool contract to move your DAI
        IERC20(daiTokenAddress).approve(
            provider.getLendingPoolCore(),
            adaiAmount
        );

        // // Deposit DAI
        lendingPool.deposit(daiTokenAddress, adaiAmount, referral);

        //uint aDaiamount = IERC20(aDAIAddress).balanceOf(address(this));
        IERC20(adaiTokenAddress).transfer(msg.sender, adaiAmount);

        // Put intoc ompound
        // Approve transfer onr the ERC20 account
        IERC20(daiTokenAddress).approve(cdaiTokenAddress, cdaiAmount);

        // Mint cTokens
        CErc20(cdaiTokenAddress).mint(cdaiAmount);
        uint256 cTokenamount = IERC20(cdaiTokenAddress).balanceOf(
            address(this)
        );

        //transfer cDAI to sender
        IERC20(cdaiTokenAddress).transfer(msg.sender, cTokenamount);

        //buy WBTC
        path[1] = wbtcTokenAddress;

        uniswapV2Router.swapExactETHForTokens.value(_amountInETHForWBTC)(
            _amountOutMinWBTC,
            path,
            msg.sender,
            now + 180
        );

        //buy PAXG
        path[1] = paxgTokenAddress;

        uniswapV2Router.swapExactETHForTokens.value(_amountInETHForPAXG)(
            _amountOutMinPAXG,
            path,
            msg.sender,
            now + 180
        );

        return amountsDAI[1];
    }
}
