// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HousingRegistry {
    struct Property {
        string id;
        string houseAddress;
        uint256 bedrooms;
        uint256 bathrooms;
        string[] features;
        bool isAvailable;
        address currentOccupant;
        uint256 moveInDate;
    }

    struct WaitlistEntry {
        address applicant;
        uint256 priorityScore;
        uint256 householdSize;
        string housingNeed;
        string specialRequirements;
        uint256 timeOnWaitlist;
        bool isActive;
    }

    struct OccupancyHistory {
        address occupant;
        uint256 moveInDate;
        uint256 moveOutDate;
        string transactionId;
    }

    // State variables
    mapping(string => Property) public properties;
    mapping(address => WaitlistEntry) public waitlist;
    mapping(string => OccupancyHistory[]) public occupancyHistory;
    address[] public waitlistOrder;
    mapping(address => bool) public owners;
    uint256 public ownerCount;

    // Events
    event PropertyAdded(string indexed id, string houseAddress);
    event PropertyRemoved(string indexed id);
    event WaitlistEntryAdded(address indexed applicant);
    event WaitlistEntryRemoved(address indexed applicant);
    event PropertyAssigned(string indexed propertyId, address indexed occupant);
    event PropertyVacated(string indexed propertyId, address indexed occupant);
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

    // Property Management
    function addProperty(
        string memory _id,
        string memory _houseAddress,
        uint256 _bedrooms,
        uint256 _bathrooms,
        string[] memory _features
    ) public onlyOwner {
        require(bytes(properties[_id].id).length == 0, "Property already exists");
        
        properties[_id] = Property({
            id: _id,
            houseAddress: _houseAddress,
            bedrooms: _bedrooms,
            bathrooms: _bathrooms,
            features: _features,
            isAvailable: true,
            currentOccupant: address(0),
            moveInDate: 0
        });

        emit PropertyAdded(_id, _houseAddress);
    }

    function removeProperty(string memory _id) public onlyOwner {
        require(bytes(properties[_id].id).length > 0, "Property does not exist");
        require(properties[_id].currentOccupant == address(0), "Property is occupied");
        
        delete properties[_id];
        emit PropertyRemoved(_id);
    }

    // Waitlist Management
    function addToWaitlist(
        uint256 _priorityScore,
        uint256 _householdSize,
        string memory _housingNeed,
        string memory _specialRequirements
    ) public {
        require(!waitlist[msg.sender].isActive, "Already on waitlist");
        
        waitlist[msg.sender] = WaitlistEntry({
            applicant: msg.sender,
            priorityScore: _priorityScore,
            householdSize: _householdSize,
            housingNeed: _housingNeed,
            specialRequirements: _specialRequirements,
            timeOnWaitlist: block.timestamp,
            isActive: true
        });

        waitlistOrder.push(msg.sender);
        emit WaitlistEntryAdded(msg.sender);
    }

    function removeFromWaitlist(address _applicant) public onlyOwner {
        require(waitlist[_applicant].isActive, "Not on waitlist");
        
        waitlist[_applicant].isActive = false;
        
        // Remove from waitlistOrder array
        for (uint i = 0; i < waitlistOrder.length; i++) {
            if (waitlistOrder[i] == _applicant) {
                waitlistOrder[i] = waitlistOrder[waitlistOrder.length - 1];
                waitlistOrder.pop();
                break;
            }
        }
        
        emit WaitlistEntryRemoved(_applicant);
    }

    // Property Assignment
    function assignProperty(string memory _propertyId, address _occupant) public onlyOwner {
        require(bytes(properties[_propertyId].id).length > 0, "Property does not exist");
        require(properties[_propertyId].isAvailable, "Property is not available");
        require(waitlist[_occupant].isActive, "Applicant not on waitlist");

        Property storage property = properties[_propertyId];
        property.isAvailable = false;
        property.currentOccupant = _occupant;
        property.moveInDate = block.timestamp;

        // Record occupancy history
        occupancyHistory[_propertyId].push(OccupancyHistory({
            occupant: _occupant,
            moveInDate: block.timestamp,
            moveOutDate: 0,
            transactionId: string(abi.encodePacked("0x", toHexString(block.timestamp)))
        }));

        // Remove from waitlist
        removeFromWaitlist(_occupant);

        emit PropertyAssigned(_propertyId, _occupant);
    }

    function vacateProperty(string memory _propertyId) public onlyOwner {
        require(bytes(properties[_propertyId].id).length > 0, "Property does not exist");
        require(!properties[_propertyId].isAvailable, "Property is already vacant");

        Property storage property = properties[_propertyId];
        address previousOccupant = property.currentOccupant;

        // Update occupancy history
        uint256 historyLength = occupancyHistory[_propertyId].length;
        require(historyLength > 0, "No occupancy history found");
        occupancyHistory[_propertyId][historyLength - 1].moveOutDate = block.timestamp;

        // Reset property
        property.isAvailable = true;
        property.currentOccupant = address(0);
        property.moveInDate = 0;

        emit PropertyVacated(_propertyId, previousOccupant);
    }

    // View Functions
    function getProperty(string memory _id) public view returns (
        string memory houseAddress,
        uint256 bedrooms,
        uint256 bathrooms,
        string[] memory features,
        bool isAvailable,
        address currentOccupant,
        uint256 moveInDate
    ) {
        Property memory property = properties[_id];
        return (
            property.houseAddress,
            property.bedrooms,
            property.bathrooms,
            property.features,
            property.isAvailable,
            property.currentOccupant,
            property.moveInDate
        );
    }

    function getWaitlistEntry(address _applicant) public view returns (
        uint256 priorityScore,
        uint256 householdSize,
        string memory housingNeed,
        string memory specialRequirements,
        uint256 timeOnWaitlist,
        bool isActive
    ) {
        WaitlistEntry memory entry = waitlist[_applicant];
        return (
            entry.priorityScore,
            entry.householdSize,
            entry.housingNeed,
            entry.specialRequirements,
            entry.timeOnWaitlist,
            entry.isActive
        );
    }

    function getOccupancyHistory(string memory _propertyId) public view returns (OccupancyHistory[] memory) {
        return occupancyHistory[_propertyId];
    }

    function getWaitlistOrder() public view returns (address[] memory) {
        return waitlistOrder;
    }

    // Get all property IDs
    function getAllPropertyIds() public view returns (string[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < 1000; i++) { // Assuming max 1000 properties
            string memory id = string(abi.encodePacked("H", uint256ToString(i + 1)));
            if (bytes(properties[id].id).length > 0) {
                count++;
            }
        }
        
        string[] memory ids = new string[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < 1000; i++) {
            string memory id = string(abi.encodePacked("H", uint256ToString(i + 1)));
            if (bytes(properties[id].id).length > 0) {
                ids[index] = id;
                index++;
            }
        }
        return ids;
    }

    // Helper function to convert uint256 to string
    function uint256ToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    // Helper function to convert uint256 to hex string
    function toHexString(uint256 value) internal pure returns (string memory) {
        bytes memory buffer = new bytes(64);
        for (uint256 i = 0; i < 64; i++) {
            bytes1 b = bytes1(uint8(uint256(value) / (2**(8 * (63 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            buffer[2*i] = char(hi);
            buffer[2*i+1] = char(lo);            
        }
        return string(buffer);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
} 