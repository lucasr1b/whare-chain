// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HousingOffers {
    struct Offer {
        string propertyId;
        address applicant;
        uint256 timestamp;
        string status; // "Pending", "Accepted", "Declined"
        string declineReason;
    }

    // State variables
    mapping(string => Offer) public offers; // propertyId => Offer
    Offer[] public offerHistory;
    address public owner;

    // Events
    event OfferCreated(string indexed propertyId, address indexed applicant);
    event OfferAccepted(string indexed propertyId, address indexed applicant);
    event OfferDeclined(string indexed propertyId, address indexed applicant, string reason);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function setOwner(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        owner = newOwner;
    }

    function createOffer(string memory _propertyId, address _applicant) public onlyOwner {
        require(bytes(offers[_propertyId].propertyId).length == 0, "Offer already exists for this property");
        
        Offer memory newOffer = Offer({
            propertyId: _propertyId,
            applicant: _applicant,
            timestamp: block.timestamp,
            status: "Pending",
            declineReason: ""
        });

        offers[_propertyId] = newOffer;
        offerHistory.push(newOffer);

        emit OfferCreated(_propertyId, _applicant);
    }

    function acceptOffer(string memory _propertyId) public {
        require(bytes(offers[_propertyId].propertyId).length > 0, "Offer does not exist");
        require(keccak256(bytes(offers[_propertyId].status)) == keccak256(bytes("Pending")), "Offer is not pending");
        require(offers[_propertyId].applicant == msg.sender, "Only the applicant can accept the offer");

        offers[_propertyId].status = "Accepted";
        
        // Update the offer in history
        for (uint i = 0; i < offerHistory.length; i++) {
            if (keccak256(bytes(offerHistory[i].propertyId)) == keccak256(bytes(_propertyId))) {
                offerHistory[i].status = "Accepted";
                break;
            }
        }

        emit OfferAccepted(_propertyId, msg.sender);
    }

    function declineOffer(string memory _propertyId, string memory _reason) public {
        require(bytes(offers[_propertyId].propertyId).length > 0, "Offer does not exist");
        require(keccak256(bytes(offers[_propertyId].status)) == keccak256(bytes("Pending")), "Offer is not pending");
        require(offers[_propertyId].applicant == msg.sender, "Only the applicant can decline the offer");

        offers[_propertyId].status = "Declined";
        offers[_propertyId].declineReason = _reason;
        
        // Update the offer in history
        for (uint i = 0; i < offerHistory.length; i++) {
            if (keccak256(bytes(offerHistory[i].propertyId)) == keccak256(bytes(_propertyId))) {
                offerHistory[i].status = "Declined";
                offerHistory[i].declineReason = _reason;
                break;
            }
        }

        emit OfferDeclined(_propertyId, msg.sender, _reason);
    }

    function getOffer(string memory _propertyId) public view returns (
        address applicant,
        uint256 timestamp,
        string memory status,
        string memory declineReason
    ) {
        Offer memory offer = offers[_propertyId];
        return (
            offer.applicant,
            offer.timestamp,
            offer.status,
            offer.declineReason
        );
    }

    function getOfferHistory() public view returns (Offer[] memory) {
        return offerHistory;
    }
} 