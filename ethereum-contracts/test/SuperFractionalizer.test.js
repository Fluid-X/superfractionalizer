const { web3tx, toWad } = require("@decentral.ee/web3-helpers")

const deployFramework = require("@superfluid-finance/ethereum-contracts/scripts/deploy-framework")
const {
	builtTruffleContractLoader
} = require("@superfluid-finance/ethereum-contracts/scripts/libs/common")
const SuperfluidSDK = require("@superfluid-finance/js-sdk")

const SuperFractionalizer = artifacts.require("SuperFractionalizer")
const SuperFractionalized = artifacts.require("SuperFractionalized")
const JuicyNFT = artifacts.require("JuicyNFT")

contract("SuperFractionalizer", accounts => {
	const errorHandler = error => {
		if (error) throw error
	}

	let sf
	let cfa
	let superTokenFactory

	let juicyNFT
	let superFractionalizer
	let superFractionalizedNFT

	const INIT_SUPPLY = toWad(1000000)
	const TOKEN_ID = 0
	const TEST_FLOW_RATE = toWad(1)

	const [admin, alice, bob] = accounts.slice(0, 4)

	before(
		async () =>
			await deployFramework(errorHandler, {
				web3,
				from: admin,
				newTestResolver: true
			})
	)

	beforeEach(async () => {
		sf = new SuperfluidSDK.Framework({
			web3,
			version: "test",
			additionalContracts: ["INativeSuperToken"],
			contractLoader: builtTruffleContractLoader
		})

		await sf.initialize()

		cfa = sf.agreements.cfa

		superTokenFactory = await sf.contracts.ISuperTokenFactory.at(
			await sf.host.getSuperTokenFactory.call()
		)

		superFractionalizer = await web3tx(
			SuperFractionalizer.new,
			"SuperFractionalizer.new by Alice"
		)(superTokenFactory.address, { from: alice })

		juicyNFT = await web3tx(JuicyNFT.new, "JuicyNFT.new by Alice")(
			"JuicyNFT",
			"JNFT",
			"testLmao",
			{ from: alice }
		)
	})

	it("Alice can Super Fractionalize", async () => {
		await web3tx(
			juicyNFT.approve,
			"Alice approves the SuperFractionalizer"
		)(superFractionalizer.address, TOKEN_ID, { from: alice })

		const tx = await web3tx(
			superFractionalizer.fractionalize,
			"Alice fractionalizes"
		)(juicyNFT.address, "Super Juicy Token", "SJT", TOKEN_ID, INIT_SUPPLY, {
			from: alice
		})

		const address = tx.receipt.rawLogs[3].address

		const { INativeSuperToken } = sf.contracts

		const native = await SuperFractionalized.at(address)
		const proxy = await INativeSuperToken.at(address)

		superFractionalizedNFT = { proxy, native }

		assert.equal(
			await superFractionalizedNFT.native.tokenId.call(),
			TOKEN_ID
		)

		assert.equal(
			await superFractionalizedNFT.native.tokenAddress.call(),
			juicyNFT.address
		)

		assert.equal(
			await juicyNFT.tokenURI.call(TOKEN_ID),
			await superFractionalizedNFT.native.tokenURI.call()
		)

		await web3tx(
			sf.host.callAgreement,
			"Alice streams SuperFractionalized NFT to Bob"
		)(
			cfa.address,
			cfa.contract.methods
				.createFlow(
					superFractionalizedNFT.native.address,
					bob,
					TEST_FLOW_RATE,
					"0x"
				)
				.encodeABI(),
			"0x",
			{ from: alice }
		)
		assert.equal(
			(
				await cfa.getFlow.call(
					superFractionalizedNFT.native.address,
					alice,
					bob
				)
			).flowRate.toString(),
			TEST_FLOW_RATE.toString()
		)
	})
})
