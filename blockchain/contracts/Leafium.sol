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
        Gateway memory newGateway = Gateway(
            gatewayId,
            gatewayName,
            lat,
            long,
            altitude
        );
        require(
            gatewayExists[gatewayId] == false,
            "Gateway already registered!"
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
        Gateway[] memory userGateways = userToGateways[msg.sender];
        bool isOfUser = false;
        for (uint256 i = 0; i < userGateways.length; i++) {
            if (
                keccak256(bytes(userGateways[i].id)) ==
                keccak256(bytes(gatewayId))
            ) {
                isOfUser = true;
                break;
            }
        }
        require(isOfUser, "Gateway not found!");
        token.rewardTo(msg.sender, awakeReward);
    }
}
