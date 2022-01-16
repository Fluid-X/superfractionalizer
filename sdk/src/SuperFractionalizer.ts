import { ethers } from "ethers"
import { abi } from "./abi/SuperFractionalizer.json"
import { SuperFractionalizer as ISuperFractionalizer } from "./typechain"
import { SuperFractionalizerOptions, FractionalizeParams } from "./types"
import { normalizeAddress } from "./utils"

export default class SuperFractionalizer {
	readonly options: SuperFractionalizerOptions

	constructor(options: SuperFractionalizerOptions) {
		this.options = options
	}

	private get superFractionalizerContract() {
		return new ethers.Contract(
			this.options.address,
			abi
		) as ISuperFractionalizer
	}

	fractionalize = async ({
		nft,
		name,
		symbol,
		tokenId,
		initialSupply,
		providerOrSigner
	}: FractionalizeParams): Promise<ethers.ContractTransaction> => {
		const normalizedNft = normalizeAddress(nft)
		try {
			return await this.superFractionalizerContract
				.connect(providerOrSigner)
				.fractionalize(
					normalizedNft,
					name,
					symbol,
					tokenId,
					initialSupply
				)
		} catch (error) {
			throw error
		}
	}
}
