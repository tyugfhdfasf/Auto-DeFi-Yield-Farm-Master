// test-environment.config.js

module.exports = {
  node: {
    // Options passed directly to Ganache client
    fork: 'https://mainnet.infura.io/v3/842298ccc2df48c5bca74c273520dab3', // An url to Ethereum node to use as a source for a fork
    unlocked_accounts: ['0x41ed148cE6489c105963e2C038c1435962a05C94'],
    id: 999, // Array of addresses specifying which accounts should be unlocked.
  },
};
