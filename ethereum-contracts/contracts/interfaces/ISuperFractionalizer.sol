// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/// @title ERC721 to Super Token Fractionalization Factory
/// @author jtriley.eth
/// @notice Requires ERC721.approve() call first.
interface ISuperFractionalizer {

    /// @notice Fractionanlizes an ERC721 NFT to Super Token
    /// @param _erc721 Address of ERC721 contract
    /// @param _tokenId ID of the token to fractionalize
    /// @param _initialSupply Initial supply fractionalized shares
    /// @return _fractionalized Address of new fractionalized NFT
    function fractionalize(
        IERC721 _erc721,
        uint256 _tokenId,
        uint256 _initialSupply
    ) external returns (address _fractionalized);

}
