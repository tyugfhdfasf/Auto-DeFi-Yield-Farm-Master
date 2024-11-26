const {
  balance,
  BN, // Big Number support
  constants, // Common constants, like the zero address and largest integers
  expectEvent, // Assertions for emitted events
  expectRevert // Assertions for transactions that should fail
} = require("@openzeppelin/test-helpers");

const { accounts, contract, web3 } = require("@openzeppelin/test-environment");

const { expect } = require("chai");

const PortfolioBalancer = contract.fromArtifact("PortfolioBalancer");

const jan = "0x41ed148cE6489c105963e2C038c1435962a05C94";

let minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function"
  },
  // decimals
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function"
  }
];

const daiTokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
// const cDaiTokenAddress = "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643";
// const aDaiTokenAddress = "0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d";
//USDC coin
const usdcTokenAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const cDaiTokenAddress = "0x39AA39c021dfbaE8faC545936693aC917d5E7563";
const aDaiTokenAddress = "0x9bA00D6856a4eDF4665BcA2C2309936572473B7E";
const wbtcTokenAddress = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
const paxgTokenAddress = "0x45804880De22913dAFE09f4980848ECE6EcbAf78";

let owner;

describe("PortfolioBalancer", function() {
  [owner] = accounts;

  beforeEach(async function() {
    try {
      this.PortfolioBalancer = await PortfolioBalancer.new({
        from: owner
      });
    } catch (err) {
      console.log(err);
    }
  });

  it("should set the owner", async function() {
    expect(await this.PortfolioBalancer.owner()).to.equal(owner);
  });

  it("should exchange some DAI for ETH", async function() {
    //let balBefore = await web3.eth.getBalance(jan);
    const balBefore = await balance.current(jan);
    console.log("ETH Balance before", balBefore.toString(10));

    let WBTC = new web3.eth.Contract(minABI, wbtcTokenAddress);
    let balWBTCBefore = await WBTC.methods.balanceOf(jan).call();
    console.log("WBTC Balance before", balWBTCBefore);

    let DAI = new web3.eth.Contract(minABI, aDaiTokenAddress);
    let balDAIBefore = await DAI.methods.balanceOf(jan).call();
    console.log("aDAI Balance before", balDAIBefore);

    let cDAI = new web3.eth.Contract(minABI, cDaiTokenAddress);
    let balcDAIBefore = await cDAI.methods.balanceOf(jan).call();
    console.log("cDAI Balance before", balcDAIBefore);

    let PAXG = new web3.eth.Contract(minABI, paxgTokenAddress);
    let balPAXGBefore = await PAXG.methods.balanceOf(jan).call();
    console.log("PAXG Balance before", balPAXGBefore);
    try {
      const result = await this.PortfolioBalancer.rebalance(
        "1000000000000000000",
        "0",
        "1000000000000000000",
        "0",
        "1000000000000000000",
        "0",
        { from: jan, value: 3000000000000000000 }
      );
    } catch (err) {
      console.log("error", err);
    }
    let balAfter = await web3.eth.getBalance(jan);
    console.log("ETH Balance after", balAfter);

    balDAIAfter = await DAI.methods.balanceOf(jan).call();
    console.log("aDAI Balance after", balDAIAfter);

    balDAIAfter = await cDAI.methods.balanceOf(jan).call();
    console.log("cDAI Balance after", balDAIAfter);

    balPAXGAfter = await PAXG.methods.balanceOf(jan).call();
    console.log("PAXG Balance after", balPAXGAfter);

    balWBTCAfter = await WBTC.methods.balanceOf(jan).call();
    console.log("WBTC Balance after", balWBTCAfter);

    expect(balBefore).to.be.bignumber.above(
      new BN(balAfter),
      "ETH amount not less"
    );
    expect(balDAIAfter).to.be.bignumber.above(
      new BN(balDAIBefore),
      "aDAI amount not more"
    );
  });

  // it('should transfer some ETH', async function () {
  //   const balBefore = await balance.current(jan);
  //   console.log('ETH Balance before', balBefore.toString(10));
  //   try {
  //     const result = await web3.eth.sendTransaction({
  //       from: jan,
  //       to: '0xd55Cb79D6242dE896bbd9526e57A66f72Aa45Ea4',
  //       value: web3.utils.toWei('0.1', 'ether'),
  //     });
  //     console.log(result);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   let balAfter = await web3.eth.getBalance(jan);
  //   console.log('ETH Balance after', balAfter);

  //   expect(balBefore).to.be.bignumber.above(
  //     new BN(balAfter),
  //     'ETH amount not less'
  //   );
  // });
});
