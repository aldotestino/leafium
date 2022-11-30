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
        uint256 earnings;
        uint256 updatedAt;
    }

    LeafiumToken token;

    mapping(address => Gateway[]) private userToGateways;
    mapping(string => bool) private gatewayExists;
    Gateway[] private gateways;
    uint256 reward = 50 * (10 ** 18);
    uint256 awakeReward = 1 * (10 ** 18);

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
        require(
            gatewayExists[gatewayId] == false,
            "Gateway already registered!"
        );
        Gateway memory newGateway = Gateway(
            gatewayId,
            gatewayName,
            lat,
            long,
            altitude,
            50,
            0
        );
        gateways.push(newGateway);
        gatewayExists[gatewayId] = true;
        userToGateways[msg.sender].push(newGateway);
        token.rewardTo(msg.sender, reward);
    }

    function getMyGateways() public view returns (Gateway[] memory) {
        return userToGateways[msg.sender];
    }

    function getGateways() public view returns (Gateway[] memory) {
        return gateways;
    }

    function getBalance() public view returns (uint256) {
        return token.balanceOf(msg.sender);
    }

    function awake(string memory gatewayId) public {
        bool isOfUser = false;
        for (uint256 i = 0; i < userToGateways[msg.sender].length; i++) {
            if (
                keccak256(bytes(userToGateways[msg.sender][i].id)) ==
                keccak256(bytes(gatewayId))
            ) {
                isOfUser = true;
                uint256 updatedEarnings = userToGateways[msg.sender][i]
                    .earnings + 1;
                uint256 updatedAt = block.timestamp;
                userToGateways[msg.sender][i].earnings = updatedEarnings;
                userToGateways[msg.sender][i].updatedAt = updatedAt;
                for (uint256 j = 0; j < gateways.length; j++) {
                    if (
                        keccak256(bytes(gateways[j].id)) ==
                        keccak256(bytes(gatewayId))
                    ) {
                        gateways[j].earnings = updatedEarnings;
                        gateways[j].updatedAt = updatedAt;
                    }
                }
                break;
            }
        }
        require(isOfUser, "Gateway not found!");
        token.rewardTo(msg.sender, awakeReward);
    }
}
