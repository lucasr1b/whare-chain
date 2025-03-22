"use client";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client } from '@/lib/thirdWebClient';
import { baseSepolia } from "thirdweb/chains";
import { ConnectButton } from "thirdweb/react";
import HousingRegistry from "../components/HousingRegistry";

const DataPage = () => {
  const account = useActiveAccount();
  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: baseSepolia,
    address: account?.address,
  });

  if (!account) {
    return (
      <div className="p-4">
        <p className="mb-4">Please connect your wallet first</p>
        <ConnectButton client={client} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4">
        <p>Loading balance...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Wallet Information</h2>
        <p>Wallet address: {account.address}</p>
        <p>
          Wallet balance: {balance?.displayValue} {balance?.symbol}
        </p>
      </div>

      <HousingRegistry />
    </div>
  );
}

export default DataPage;