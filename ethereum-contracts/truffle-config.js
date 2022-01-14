module.exports = {
	networks: {
		ganache: {
			host: "127.0.0.1",
			network_id: "*",
			port: process.env.GANACHE_PORT || 8545
		}
	},
	mocha: {
		timeout: 100000
	},

	compilers: {
		solc: {
			version: "0.8.11"
		}
	}
}
