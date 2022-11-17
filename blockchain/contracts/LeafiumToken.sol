pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LeafiumToken is ERC20{

    address internal owner;
    uint256 private totalToken = 10000 * (10 ** 18);
    uint256 private reward = 50 * (10 ** 18);

    constructor() public ERC20("Leafium", "LFM") {
        _mint(address(this), totalToken); //or msg.sender as owner
        // owner = msg.sender;
        owner = address(this);
    }

    function transferToken(address to) internal {
        super._transfer(owner, to, reward);
    }

    function getBalanceToken(address account) internal view returns (uint256){
        require(msg.sender == account ||msg.sender == owner, 'not authorized');
        return super.balanceOf(account);
    }
   
}