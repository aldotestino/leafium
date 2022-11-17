// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./LeafiumToken.sol";

contract Leafium {
    struct Gateway {
        string id;
        string name;
        string lat;
        string long;
        uint256 altitude;
    }

    LeafiumToken token;

    mapping(address => Gateway[]) private userToGateways;
    Gateway[] private gateways;
    uint256 reward = 50 * (10**18);

    constructor(address tokenAddress) {
        token = LeafiumToken(tokenAddress);
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
        token.transferToken(msg.sender, reward);
    }

    function getMyGateways() public view returns (Gateway[] memory) {
        return userToGateways[msg.sender];
    }

    function getGateways() public view returns (Gateway[] memory) {
        return gateways;
    }

    function getBalance() public view returns (uint256) {
        return token.getUserBalance(msg.sender);
    }
}
