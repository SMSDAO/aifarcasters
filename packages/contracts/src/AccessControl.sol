// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title AiFarcasterAccessControl
 * @notice Role-based access control for AiFarcaster on-chain features
 */
contract AiFarcasterAccessControl is AccessControl {
    bytes32 public constant ADMIN_ROLE = DEFAULT_ADMIN_ROLE;
    bytes32 public constant DEVELOPER_ROLE = keccak256("DEVELOPER_ROLE");
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");

    mapping(address => bool) private _blocked;

    event UserBlocked(address indexed account);
    event UserUnblocked(address indexed account);

    constructor(address admin) {
        _grantRole(ADMIN_ROLE, admin);
        _grantRole(DEVELOPER_ROLE, admin);
    }

    function grantUserRole(address account) external onlyRole(ADMIN_ROLE) {
        _grantRole(USER_ROLE, account);
    }

    function grantDeveloperRole(address account) external onlyRole(ADMIN_ROLE) {
        _grantRole(DEVELOPER_ROLE, account);
    }

    function blockUser(address account) external onlyRole(ADMIN_ROLE) {
        _blocked[account] = true;
        emit UserBlocked(account);
    }

    function unblockUser(address account) external onlyRole(ADMIN_ROLE) {
        _blocked[account] = false;
        emit UserUnblocked(account);
    }

    function isBlocked(address account) external view returns (bool) {
        return _blocked[account];
    }

    function hasAccess(address account) external view returns (bool) {
        return !_blocked[account] && (
            hasRole(ADMIN_ROLE, account) ||
            hasRole(DEVELOPER_ROLE, account) ||
            hasRole(USER_ROLE, account)
        );
    }
}
