// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LeafiumToken is ERC20 {
    constructor(uint256 totalTokens) ERC20("Leafium", "LFM") {
        _mint(address(this), totalTokens);
    }

    function transferToken(address to, uint256 amount) public {
        super._transfer(address(this), to, amount);
    }

    function getUserBalance(address userAddress) public view returns (uint256) {
        return super.balanceOf(userAddress);
    }
}
