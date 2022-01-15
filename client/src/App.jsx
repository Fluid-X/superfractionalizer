import React from 'react';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css'

//FIXME: gives error needs resolve in webpack.config.js
// import Web3 from 'web3';


import contract from './abi/IERC721.json';

// TODO: use the latest json file. This is a temporary address by Truffle
const  contractAddress = "0x05159dDE23304563D52ffD0D36f18fAcD58bF0A6";
const abi = contract.abi



export default function App() {

    const [currentAccount, setCurrentAccount] = useState(null);
    
  
    const checkWalletIsConnected = async () => {
      const { ethereum } = window;
  
      if (!ethereum) {
        console.log("Make sure you have Metamask installed!");
        return;
      } else {
        console.log("Wallet exists! We're ready to go!")
      }
  
      const accounts = await ethereum.request({ method: 'eth_accounts' });
  
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    }
  
    const connectWalletHandler = async () => {
      const { ethereum } = window;
  
      if (!ethereum) {
        alert("Please install Metamask!");
      }
  
      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Found an account! Address: ", accounts[0]);
        setCurrentAccount(accounts[0]);
      } catch (err) {
        console.log(err)
      }
    }
  
    const mintNftHandler = async () => {
      try {
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const nftContract = new ethers.Contract(contractAddress, abi, signer);
  
          console.log("Initialize payment");
          let nftTxn = await nftContract.mintNFTs(1, { value: ethers.utils.parseEther("0.01") });
  
          console.log("Mining... please wait");
          await nftTxn.wait();
  
          console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
  
        } else {
          console.log("Ethereum object does not exist");
        }
  
      } catch (err) {
        console.log(err);
      }
    }
  
    const connectWalletButton = () => {
      return (
        <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
          Connect Wallet
        </button>
      )
    }
  
    const mintNftButton = () => {
      return (
        <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
          Mint NFT
        </button>
      )
    }
  
    useEffect(() => {
      checkWalletIsConnected();
    }, [])



    return (
        <div className='main-app'>
          <h1> Good Hacking 🤘</h1>
          <div>
            {currentAccount ? mintNftButton() : connectWalletButton()}
          </div>
        </div>
      )


}
