// This is where the super fractionalizer interactions should ideally take place.
import { ethers } from "ethers"
import ERC721 from "../abi/ERC721.json"
import ISuperFractionalizer from "../abi/ISuperFractionalizer.json"
import { goerliSuperFractionalizer } from "../constants"

// import { Nft, SuperFractionzlier } from 'super-fractionalizer-sdk'

export async function getSigner(ethereum) {
	const provider = new ethers.providers.Web3Provider(ethereum)
	return provider.getSigner()
}

export async function nftExists(signer, address, id, chain) {
	if (chain !== "goerli") return false
	// if (!(parseInt(id) == id)) return false

	const contract = new ethers.Contract(address, ERC721.abi, signer.provider)
	try {
		// const uri = await new Nft({ address, chainId: chain }).tokenURI({ tokenId: id, providerOrSigner: signer })
		await contract.tokenURI(id)
		return true
	} catch (error) {
		console.error({ error })
		return false
	}
}

export async function isApproved(signer, address, id, chain) {
	if (chain !== "goerli") return false
	const contract = new ethers.Contract(address, ERC721.abi, signer.provider)
	try {
		const approvedAddress = await contract.getApproved(id)
		return (
			approvedAddress.toLowerCase() ===
			goerliSuperFractionalizer.toLowerCase()
		)
	} catch (error) {
		console.error({ error })
		return false
	}
}

export async function approve(signer, tokenAddress, tokenId) {
	const contract = new ethers.Contract(tokenAddress, ERC721.abi, signer)
	console.log({ contract })
	try {
		const tx = await contract.approve(goerliSuperFractionalizer, tokenId)
		await tx.wait()
		return true
	} catch (error) {
		console.error({ error })
		return false
	}
}

export async function fractionalize(
	signer,
	tokenAddress,
	name,
	symbol,
	tokenId,
	initialSupply
) {
	const superFractionalizer = new ethers.Contract(
		goerliSuperFractionalizer,
		ISuperFractionalizer.abi,
		signer
	)
	try {
		const tx = await superFractionalizer.fractionalize(
			tokenAddress,
			name,
			symbol,
			tokenId,
			initialSupply
		)
		await tx.wait()
		console.log({ tx })
		return tx
	} catch (error) {
		console.error({ error })
		return null
	}
}
