# Super Fractionalizer

<img src = "client/public/logo192.png" >

The Super Fractionalizer is a smart contract that fractionalizes an ERC721 NFT directly into a Super Token. It brings to NFTs all of the juicy functionality the Superfluid protocol has built.

- Per second token streaming
  - Real-time investing
  - Continuous auctions

- Highly scalable, recurring token distributions
Airdrops

- Batchable transactions



## How it's made

We used @superfluid-finance/ethereum-contracts for the ISuperToken and ISuperTokenFactory, and @openzeppelin/contracts for the IERC721 interface and the Proxy contract. In the same transaction, the Super Fractionalizer creates a super token with the create2 opcode, sends the resulting address to the super token factory for upgrade, initializes the super token with some useful metadata and an initial supply, and locks the NFT in the super token contract. The client is a react app that searches for an NFT given an address, token id, and network, then prompts an approval, then fractionalization.

 The SDK interfaces with both contracts with typescript and typechain, for any external projects that may need type declarations.


