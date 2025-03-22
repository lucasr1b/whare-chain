import { client } from "./thirdWebClient";
import { baseSepolia } from "thirdweb/chains";

export const CONTRACT_ADDRESS = "0xCD6ef2e4e4d27904dF912838d2aeF110ab78FC15";

// Contract ABI - this should match your deployed contract
export const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_houseAddress",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_bedrooms",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_bathrooms",
        "type": "uint256"
      },
      {
        "internalType": "string[]",
        "name": "_features",
        "type": "string[]"
      }
    ],
    "name": "addProperty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]; 