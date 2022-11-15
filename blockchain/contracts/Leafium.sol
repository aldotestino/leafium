pragma solidity ^0.8.9;

//ERC Token Standard #20 Interface
import "./LeafiumToken.sol";

contract Leafium is LeafiumToken{
    // event GatewayAdded()

    struct Gateway {
        string id;
        string name;
        string lat;
        string long;
        uint256 altitude;
    }

    mapping(address => Gateway[]) private userToGateways;
    Gateway[] private gateways;
    // uint256 private totalToken = 1 * (10 ** 18);
    // uint256 private reward = 50;

    constructor() public LeafiumToken() {
        // _mint(msg.sender, totalToken);
        // admin = msg.sender;

    }

    function addGateway(
        string memory gatewayId,
        string memory gatewayName,
        string memory lat,
        string memory long,
        uint256 altitude
    ) public {
        Gateway memory newGateway = Gateway(
            gatewayId,
            gatewayName,
            lat,
            long,
            altitude
        );
        gateways.push(newGateway);
        userToGateways[msg.sender].push(newGateway);
        // super._transfer(admin, msg.sender, reward);
        LeafiumToken.transferToken(msg.sender);

    }

    function getMyGateways() public view returns (Gateway[] memory) {
        return userToGateways[msg.sender];
    }

    function getGateways() public view returns (Gateway[] memory){
        return gateways;
    }

    function getBalance(address account) public view returns (uint256){
        require(msg.sender == account || msg.sender == LeafiumToken.admin, 'not authorized');
        // return super.balanceOf(account);
        return LeafiumToken.getBalanceToken(account);
    }
   
}
