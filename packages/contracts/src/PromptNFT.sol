// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title PromptNFT
 * @notice ERC-721 token representing an optimized AI prompt
 */
contract PromptNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    uint256 public mintPrice = 0.001 ether;
    bool public publicMintEnabled = false;

    event PromptMinted(address indexed to, uint256 indexed tokenId, string tokenURI);
    event MintPriceUpdated(uint256 oldPrice, uint256 newPrice);

    constructor(address initialOwner) ERC721("PromptNFT", "PNFT") Ownable(initialOwner) {}

    function mint(address to, string memory tokenURI_) external payable returns (uint256) {
        if (!publicMintEnabled) {
            require(msg.sender == owner(), "PromptNFT: public minting not enabled");
        } else {
            require(msg.value >= mintPrice, "PromptNFT: insufficient payment");
        }

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI_);

        emit PromptMinted(to, newTokenId, tokenURI_);
        return newTokenId;
    }

    function setPublicMintEnabled(bool enabled) external onlyOwner {
        publicMintEnabled = enabled;
    }

    function setMintPrice(uint256 newPrice) external onlyOwner {
        emit MintPriceUpdated(mintPrice, newPrice);
        mintPrice = newPrice;
    }

    function withdraw() external onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "PromptNFT: withdrawal failed");
    }

    function totalSupply() external view returns (uint256) {
        return _tokenIds.current();
    }
}
