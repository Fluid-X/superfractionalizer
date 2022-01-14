// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Interface for Super Fractionalized NFT
/// @author jtriley.eth
interface ISuperFractionalized {

    /// @notice Initializes with logic contract, MUST BE UPGRADED
    /// @param name Super Fractionalized name
    /// @param symbol Super Fractionalized symbol
    /// @param initialSupply Initial fractional supply
    /// @param tokenId_ Underlying NFT token id
    /// @param tokenAddress_ Underlying NFT address
    /// @param recipient Receiver of initialSupply
    function initialize(
		string memory name,
		string memory symbol,
		uint256 initialSupply,
		uint256 tokenId_,
		address tokenAddress_,
		address recipient
    ) external;

    /// @notice Pass through function to underlying ERC721
    /// @return _uri Token URI returned from underlying
    function tokenURI() external view returns (string memory _uri);

}
