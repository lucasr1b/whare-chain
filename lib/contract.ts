import { client } from "./thirdWebClient";
import { baseSepolia } from "thirdweb/chains";

export const CONTRACT_ADDRESS = "0x1F3DEF46d826bA093e323e892627661558dB1327";

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