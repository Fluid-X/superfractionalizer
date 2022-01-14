const Contract = require("web3-eth-contract")

// set provider for all later instances to use
Contract.setProvider("")

var contract = new Contract(jsonInterface, address)

contract.methods
	.somFunc()
	.send({ from })
	.on("receipt", function () {})
