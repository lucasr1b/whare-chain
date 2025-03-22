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
    mapping(address => bool) public owners;
    uint256 public ownerCount;

    // Events
    event OfferCreated(string indexed propertyId, address indexed applicant);
    event OfferAccepted(string indexed propertyId, address indexed applicant);
    event OfferDeclined(string indexed propertyId, address indexed applicant, string reason);
    event OwnerAdded(address indexed newOwner);
    event OwnerRemoved(address indexed removedOwner);

    constructor() {
        owners[msg.sender] = true;
        ownerCount = 1;
    }

    modifier onlyOwner() {
        require(owners[msg.sender], "Only owner can call this function");
        _;
    }

    function addOwner(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        require(!owners[newOwner], "Address is already an owner");
        
        owners[newOwner] = true;
        ownerCount++;
        emit OwnerAdded(newOwner);
    }

    function removeOwner(address ownerToRemove) public onlyOwner {
        require(ownerToRemove != msg.sender, "Cannot remove self");
        require(owners[ownerToRemove], "Address is not an owner");
        require(ownerCount > 1, "Cannot remove the last owner");
        
        owners[ownerToRemove] = false;
        ownerCount--;
        emit OwnerRemoved(ownerToRemove);
    }

    function isOwner(address account) public view returns (bool) {
        return owners[account];
    }

    function getOwners() public view returns (address[] memory) {
        address[] memory ownerList = new address[](ownerCount);
        uint256 index = 0;
        for (uint256 i = 0; i < 1000; i++) { // Assuming max 1000 owners
            address potentialOwner = address(uint160(i));
            if (owners[potentialOwner]) {
                ownerList[index] = potentialOwner;
                index++;
            }
        }
        return ownerList;
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