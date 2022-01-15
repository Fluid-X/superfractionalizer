import React from "react"
import { useEffect, useState } from "react"
import "./App.css"
import {
	approve,
	fractionalize,
	getSigner,
	nftExists,
	isApproved
} from "./helpers/superfractionalizer"

export default function App() {
	const [currentAccount, setCurrentAccount] = useState(null)
	const [signer, setSigner] = useState(null)
	const [found, setFound] = useState(false)
	const [approved, setApproved] = useState(false)
	const [contractAddress, setContractAddress] = useState("")
	const [tokenId, setTokenId] = useState("")
	const [chain, setChain] = useState("")
	const [name, setName] = useState("")
	const [symbol, setSymbol] = useState("")
	const [initialSupply, setInitialSupply] = useState("")

	const checkWalletIsConnected = async () => {
		const { ethereum } = window

		await ethereum.enable()

		if (!ethereum) {
			console.log("Make sure you have Metamask installed!")
			return
		} else {
			console.log("Wallet exists! We're ready to go!")
		}

		const accounts = await ethereum.request({ method: "eth_accounts" })

		if (accounts.length !== 0) {
			const account = accounts[0]
			console.log("Found an authorized account: ", account)
			setCurrentAccount(account)
		} else {
			console.log("No authorized account found")
		}
	}

	const approveNFT = async () => {
		const appr = await approve(
			signer,
			"0x850efB7d60374D60C48831b0F5F18362255BAF12",
			"0"
		)

		setApproved(appr)
	}

	const fractionalizeNFT = async () =>
		await fractionalize(
			signer,
			contractAddress,
			name,
			symbol,
			tokenId,
			initialSupply
		)

	const onSearch = async () => {
		setFound(await nftExists(signer, contractAddress, tokenId, chain))
		setApproved(await isApproved(signer, contractAddress, tokenId, chain))
	}

	const connectSigner = async () => {
		const s = await getSigner(window.ethereum)
		setSigner(s)
	}

	useEffect(() => {
		checkWalletIsConnected()
	}, [])

	if (signer === null) {
		return (
			<div className="app centered">
				<div className="connect-container">
					<h2>Please connect a signer to continue</h2>
					<button
						className="cta-button primary-button"
						onClick={connectSigner}
					>
						Connect Signer
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className="app">
			<header className="header">
				<h1>Super Fractionalizer</h1>

				<p>{currentAccount}</p>
			</header>
			<div className="container">
				<div className="card">
					<div>
						<h2>Find your NFT!</h2>
						<div className="input-container">
							<label>Contract Address</label>
							<input
								type="text"
								className="text-input"
								onChange={e =>
									setContractAddress(e.target.value)
								}
								value={contractAddress}
							/>
						</div>
						<div className="input-container">
							<label>Token ID</label>
							<input
								type="text"
								className="text-input"
								onChange={e => setTokenId(e.target.value)}
								value={tokenId}
							/>
						</div>
						<div className="input-container">
							<label>Chain</label>
							<input
								type="text"
								className="text-input"
								onChange={e =>
									setChain(e.target.value.toLowerCase())
								}
								value={chain}
							/>
						</div>
						<div style={found ? null : { display: "none" }}>
							<h3 className="success">Found!</h3>
							<div className="input-container">
								<label>Name of Super Fractionalized NFT</label>
								<input
									type="text"
									className="text-input"
									onChange={e => setName(e.target.value)}
									value={name}
								/>
							</div>
							<div className="input-container">
								<label>
									Symbol of Super Fractionalized NFT
								</label>
								<input
									type="text"
									className="text-input"
									onChange={e => setSymbol(e.target.value)}
									value={symbol}
								/>
							</div>
							<div className="input-container">
								<label>
									Initial Supply of Super Fractionalized NFT
									Shares
								</label>
								<input
									type="text"
									className="text-input"
									onChange={e =>
										setInitialSupply(e.target.value)
									}
									value={initialSupply}
								/>
								<p className="warning">
									Be sure to add 18 trailing zeros!
								</p>
							</div>
						</div>
					</div>
					<div>
						<button
							className="cta-button primary-button"
							onClick={onSearch}
						>
							Search
						</button>
					</div>
				</div>
				<div className="card">
					<div className="svg-container">
						<svg
							width="512"
							height="512"
							viewBox="0 0 512 512"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M512 0H0V512H512V0Z" fill="#26103D" />
							<path
								d="M453.79 70.52C374.67 -3.68 223 101.44 157.11 163.27C91.22 225.1 -20.89 367.33 58.21 441.53C137.31 515.73 289 410.61 354.89 348.78C420.78 286.95 532.9 144.72 453.79 70.52Z"
								stroke="url(#paint0_linear_36_2)"
								strokeWidth="20"
								strokeMiterlimit="10"
							/>
							<path
								d="M58.21 70.52C137.33 -3.68 289 101.44 354.89 163.27C420.78 225.1 532.89 367.33 453.79 441.53C374.69 515.73 223 410.61 157.11 348.78C91.22 286.95 -20.9 144.72 58.21 70.52Z"
								stroke="url(#paint1_linear_36_2)"
								strokeWidth="20"
								strokeMiterlimit="10"
							/>
							<path
								d="M256 202L305 173L355 202V258L305 287M256 202L206 173L156.5 202V258L206 287M256 202V258M305 287V342.5L256 371.5L206 342.5V287M305 287L256 258M206 287L256 258"
								stroke="#FA0DD8"
								strokeWidth="8"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_36_2"
									x1="21"
									y1="256.02"
									x2="491"
									y2="256.02"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#FA0DD8" />
									<stop offset="1" stopColor="#008AFF" />
								</linearGradient>
								<linearGradient
									id="paint1_linear_36_2"
									x1="21"
									y1="256.02"
									x2="491"
									y2="256.02"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#FFA619" />
									<stop offset="1" stopColor="#FA0DD8" />
								</linearGradient>
							</defs>
						</svg>
					</div>
					<div className="button-container">
						<button
							disabled={found || approved}
							style={{ opacity: found ^ approved ? 1 : 0.2 }}
							className="cta-button primary-button margin-button"
							onClick={approveNFT}
						>
							Approve
						</button>
						<button
							className="cta-button primary-button margin-button"
							disabled={!approved}
							style={{ opacity: approved ? 1 : 0.2 }}
							onClick={fractionalizeNFT}
						>
							Fractionalize
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
