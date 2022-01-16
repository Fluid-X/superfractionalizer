// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// comment previous line and uncomment this line for Remix
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";


contract JuicyNFT is ERC721 {
	string internal _tokenURI;

	constructor(
		string memory name,
		string memory symbol,
		string memory uri
	) ERC721(name, symbol) {
		super._safeMint(msg.sender, 0);
		_tokenURI = uri;
	}

	function tokenURI(uint256 tokenId)
		public
		view
		virtual
		override
		returns (string memory)
	{
		require(
			tokenId == 0,
			"ERC721Metadata: URI query for nonexistent token"
		);
		return _tokenURI;
	}
}
