pragma solidity ^0.8.9;

//ERC Token Standard #20 Interface
import "./LeafiumToken.sol";

contract Leafium is LeafiumToken{

    struct Gateway {
        string id;
        string name;
        string lat;
        string long;
        uint256 altitude;
    }

    mapping(address => Gateway[]) private userToGateways;
    Gateway[] private gateways;

    constructor() LeafiumToken() {
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
        LeafiumToken.transferToken(msg.sender);

    }

    function getMyGateways() public view returns (Gateway[] memory) {
        return userToGateways[msg.sender];
    }

    function getGateways() public view returns (Gateway[] memory){
        return gateways;
    }

    function getBalance() public view returns (uint256){
        return LeafiumToken.getBalanceToken();
    }
   
}
