// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LeafiumToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Leafium", "LFM") {
        _mint(address(this), initialSupply);
    }

    function rewardTo(address to, uint256 amount) public {
        super._transfer(address(this), to, amount);
    }
}
