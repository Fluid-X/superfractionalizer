// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract JuicyNFT is ERC721 {
	constructor() ERC721("JuicyNFT", "JNFT") {
		super._safeMint(msg.sender, 0);
	}

	function _baseURI() internal pure override returns (string memory) {
		return "example/";
	}
}
