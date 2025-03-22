"use client";
import { useState } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { client } from '@/lib/thirdWebClient';
import { baseSepolia } from "thirdweb/chains";
import { ConnectButton } from "thirdweb/react";
import { CONTRACT_ADDRESS } from "@/lib/contract";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";

const HousingRegistry = () => {
  const account = useActiveAccount();
  const [propertyId, setPropertyId] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [features, setFeatures] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const handleAddProperty = async () => {
    if (!account) {
      setError("Please connect your wallet first");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Convert features string to array
      const featuresArray = features.split(",").map(feature => feature.trim());

      // Create contract instance
      const contract = getContract({
        client,
        chain: baseSepolia,
        address: CONTRACT_ADDRESS,
      });


      const transaction = prepareContractCall({
        contract,
        method:
          "function addProperty(string _id, string _houseAddress, uint256 _bedrooms, uint256 _bathrooms, string[] _features)",
        params: [
          propertyId,
          houseAddress,
          BigInt(bedrooms),
          BigInt(bathrooms),
          featuresArray,
        ],
      });

      const result = await sendTransaction({
        transaction,
        account,
      });

      // alert("Property added successfully!");
      console.log("Property added successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add property");
    } finally {
      setIsLoading(false);
    }
  };

  if (!account) {
    return (
      <div className="p-4">
        <p className="mb-4">Please connect your wallet first</p>
        <ConnectButton client={client} />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Housing Registry</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Property ID</label>
          <input
            type="text"
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter property ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">House Address</label>
          <input
            type="text"
            value={houseAddress}
            onChange={(e) => setHouseAddress(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter house address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bedrooms</label>
          <input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(Number(e.target.value))}
            className="w-full p-2 border rounded"
            placeholder="Enter number of bedrooms"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bathrooms</label>
          <input
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(Number(e.target.value))}
            className="w-full p-2 border rounded"
            placeholder="Enter number of bathrooms"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Features (comma-separated)</label>
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g., Parking, Garden, Security System"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          onClick={handleAddProperty}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? "Adding Property..." : "Add Property"}
        </button>
      </div>
    </div>
  );
};

export default HousingRegistry; 