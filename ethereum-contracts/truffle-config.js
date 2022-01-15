const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config()
module.exports = {
	plugins: [
		'truffle-plugin-verify'
	],
	networks: {
		ganache: {
			host: "127.0.0.1",
			network_id: "*",
			port: process.env.GANACHE_PORT || 8545
		},
		goerli: {
			provider: () => new HDWalletProvider(
				process.env.GOERLI_MNEMONIC,
				process.env.GOERLI_PROVIDER_URL,
			),
			network_id: 5, // Goerli's id
			// gas: GAS_LIMIT,
			gasPrice: 10e9, // 10 GWEI
			timeoutBlocks: 50, // # of blocks before a deployment times out  (minimum/default: 50)
			skipDryRun: false // Skip dry run before migrations? (default: false for public nets )
		},
		matic: {
			provider: () => new HDWalletProvider(
				process.env.GOERLI_MNEMONIC,
				process.env.GOERLI_PROVIDER_URL,
			),
			network_id: 137,
			gasPrice: 10e10,
			skipDryRun: false
		}
	},
	mocha: {
		timeout: 100000
	},
	compilers: {
		solc: {
			version: "0.8.11"
		}
	},
	api_keys: {
		etherscan: process.env.ETHERSCAN_KEY
	}
}
