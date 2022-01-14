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

	const INIT_SUPPLY = toWad(100)
	const TOKEN_ID = 0

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

		juicyNFT = await web3tx(JuicyNFT.new, "JuicyNFT.new by Alice")()
	})

	it("Alice can Super Fractionalize", async () => {
		await web3tx(
			juicyNFT.approve,
			"Alice approves the SuperFractionalizer"
		)(superFractionalizer.address, TOKEN_ID)

		const address = await web3tx(
			superFractionalizer.fractionalize,
			"Alice fractionalizes"
		)(juicyNFT.address, "Super Juicy Token", "SJT", TOKEN_ID, INIT_SUPPLY)

        console.log(address)

        const { INativeSuperToken } = sf.contracts

        const native = await SuperFractionalized.at(address)
        const proxy = await INativeSuperToken.at(address)

        superFractionalizedNFT = { proxy, native }

        const uri = await superFractionalizedNFT.native.tokenURI.call()
        console.log({ uri })
	})
})
