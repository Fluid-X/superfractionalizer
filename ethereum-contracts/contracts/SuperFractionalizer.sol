// SPDX-License-Identifier
pragma solidity ^0.8.0;

import {ISuperFractionalizer} from "./interfaces/ISuperFractionalizer.sol";
import {SuperFractionalizedBase} from "./base/SuperFractionalizedBase.sol";

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract SuperFractionalizer is ISuperFractionalizer {

    
    function fractionalize(
        IERC721 _erc721,
        uint256 _tokenId,
        uint256 _initialSupply
    ) public returns (address _superFractionalized) {

        bytes memory bytecode = type(SuperFractionalizedBase).creationCode;


    }

}
