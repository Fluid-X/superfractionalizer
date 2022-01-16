import { ethers } from "ethers"
import { abi } from "./abi/ERC721.json"
import { ERC721 as IERC721 } from "./typechain"
import {
	NftOptions,
	TokenURIParams,
	MetadataParams,
	ApproveParams
} from "./types"
import { normalizeAddress } from "./utils"

export default class Nft {
	readonly options: NftOptions

	constructor(options: NftOptions) {
		this.options = options
	}

	private get nftContract() {
		return new ethers.Contract(this.options.address, abi) as IERC721
	}

	name = async ({ providerOrSigner }: MetadataParams): Promise<string> => {
		try {
			return await this.nftContract.connect(providerOrSigner).name()
		} catch (error) {
			throw error
		}
	}

	symbol = async ({ providerOrSigner }: MetadataParams): Promise<string> => {
		try {
			return await this.nftContract.connect(providerOrSigner).symbol()
		} catch (error) {
			throw error
		}
	}

	tokenURI = async ({
		tokenId,
		providerOrSigner
	}: TokenURIParams): Promise<string> => {
		try {
			return await this.nftContract
				.connect(providerOrSigner)
				.tokenURI(tokenId)
		} catch (error) {
			throw error
		}
	}

	approve = async ({
		to,
		tokenId,
		providerOrSigner
	}: ApproveParams): Promise<ethers.ContractTransaction> => {
		try {
			return await this.nftContract
				.connect(providerOrSigner)
				.approve(normalizeAddress(to), tokenId)
		} catch (error) {
			throw error
		}
	}
}
