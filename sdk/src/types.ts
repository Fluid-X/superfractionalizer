import { ethers } from 'ethers'

export interface NftOptions {
	readonly address: string
	readonly chainId: string
}

export interface SuperFractionalizerOptions {
	readonly address: string
	readonly chainId: string
}

type ProviderOrSigner = ethers.providers.Provider | ethers.Signer

export interface MetadataParams {
    providerOrSigner: ProviderOrSigner
}

export interface TokenURIParams {
    tokenId: ethers.BigNumberish
    providerOrSigner: ProviderOrSigner
}

export interface ApproveParams {
    to: string
    tokenId: ethers.BigNumberish
    providerOrSigner: ProviderOrSigner
}

export interface FractionalizeParams {
    nft: string
    name: string
    symbol: string
    tokenId: ethers.BigNumberish
    initialSupply: ethers.BigNumberish
    providerOrSigner: ProviderOrSigner
}
