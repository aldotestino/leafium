pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LeafiumToken is ERC20{

    address internal admin;
    uint256 private totalToken = 1 * (10 ** 18);
    uint256 private reward = 50;

    constructor() public ERC20("Leafium", "LFM") {
        _mint(msg.sender, totalToken);
        admin = msg.sender;
    }

    function transferToken(address to) internal {
        super._transfer(admin, to, reward);
    }

    function getBalanceToken(address account) internal view returns (uint256){
        require(msg.sender == account ||msg.sender == admin, 'not authorized');
        return super.balanceOf(account);
    }
   
}