// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/// @title ERC721 to Super Token Fractionalization Factory
/// @author jtriley.eth
/// @notice Requires ERC721.approve() call first.
interface ISuperFractionalizer {

    /// @dev Thrown when user has not approved this contract to transferFrom
    error NotApproved();

    /// @dev Thrown when user is not the owner of the token
    error NotTokenOwner();

    /// @notice Emitted when super token is fractionalized
    /// @param receiver Receiver of the initial supply
    /// @param erc721Token Underlying NFT contract address
    /// @param tokenId Token ID of underlying NFT
    /// @param superFractionalized Address of Super Fractionalized Token
    /// @param initialSupply Initial supply of fractions
    event Fractionalized(
        address receiver,
        address erc721Token,
        uint256 tokenId,
        address superFractionalized,
        uint256 initialSupply
    );

    /// @notice Fractionanlizes an ERC721 NFT to Super Token
    /// @param _erc721 Address of ERC721 contract
    /// @param _name Name of super token
    /// @param _symbol Symbol of super token
    /// @param _tokenId ID of the token to fractionalize
    /// @param _initialSupply Initial supply fractionalized shares
    /// @return _superFractionalized Address of new fractionalized NFT
    function fractionalize(
        IERC721 _erc721,
        string memory _name,
        string memory _symbol,
        uint256 _tokenId,
        uint256 _initialSupply
    ) external returns (address _superFractionalized);

}
