import { ethers } from "ethers"

export function normalizeAddress(address?: string) {
    if (!address) return ''
    if (!ethers.utils.isAddress(address)) throw Error('Invalid Address')
    return address.toLowerCase()
}
