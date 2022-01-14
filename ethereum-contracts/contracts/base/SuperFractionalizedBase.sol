// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {UUPSProxy} from "../utils/UUPSProxy.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";

/// @title Base contract for Super Fractional Tokens
/// @author jtriley.eth
contract SuperFractionalizedBase is UUPSProxy {
	/// @dev Pads first 32 storage slots for logic contract writes
	uint256[32] internal _storagePaddings;

	/// @dev Underlying token id
	uint256 internal _tokenId;

	/// @dev Underlying token address
	address internal _tokenAddress;

	function initialize(
		string memory name,
		string memory symbol,
		uint256 initalSupply,
		uint256 tokenId,
		address tokenAddress,
		address recipient
	) external {
		_tokenId = tokenId;
		_tokenAddress = tokenAddress;
		ISuperToken(address(this)).initialize(
			IERC20(address(0)),
			0,
			name,
			symbol
		);

		ISuperToken(address(this)).selfMint(
			recipient,
			initalSupply,
			new bytes(0)
		);
	}
}
