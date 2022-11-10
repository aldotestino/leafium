// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Leafium {
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

    constructor() {}

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
    }

    function getMyGateways() public view returns (Gateway[] memory) {
        return userToGateways[msg.sender];
    }

    function getGateways() public view returns (Gateway[] memory){
        return gateways;
    }
}
