// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ISuperFractionalizer} from "./interfaces/ISuperFractionalizer.sol";
import {SuperFractionalized} from "./SuperFractionalized.sol";
import {ISuperFractionalized} from "./interfaces/ISuperFractionalized.sol";

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {ISuperTokenFactory} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperTokenFactory.sol";

contract SuperFractionalizer is ISuperFractionalizer {
	ISuperTokenFactory internal immutable _factory;

	constructor(ISuperTokenFactory factory) {
		_factory = factory;
	}

	/// @dev Implementation of ISuperFractionalizer.fractionalize
	/// MUST have approved SuperFractionalizer
	/// MUST be owner of NFT
	function fractionalize(
		IERC721 _erc721,
		string memory _name,
		string memory _symbol,
		uint256 _tokenId,
		uint256 _initialSupply
	) public override returns (address _superFractionalized) {
		// CHECKS
		if (msg.sender != _erc721.ownerOf(_tokenId)) revert NotTokenOwner();
		if (address(this) != _erc721.getApproved(_tokenId))
			revert NotApproved();

		// DEPLOY
		bytes32 salt = keccak256(abi.encode(_erc721, _tokenId));
		bytes memory bytecode = type(SuperFractionalized).creationCode;
		assembly {
			_superFractionalized := create2(
				0,
				add(bytecode, 32),
				mload(bytecode),
				salt
			)
		}

		// UPGRADE WITH THE FACTORY
		_factory.initializeCustomSuperToken(_superFractionalized);

		// INTIALIZE
		ISuperFractionalized(_superFractionalized).initialize(
			_name,
			_symbol,
			_initialSupply,
			_tokenId,
			address(_erc721),
			msg.sender
		);

        // LOCK THE NFT
        _erc721.transferFrom(msg.sender, _superFractionalized, _tokenId);

		// EMIT
		emit Fractionalized(
			msg.sender,
			address(_erc721),
			_tokenId,
			_superFractionalized,
			_initialSupply
		);
	}
}
