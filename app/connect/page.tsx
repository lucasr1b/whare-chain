"use client"

import { client } from '@/lib/thirdWebClient';
import { ConnectButton, darkTheme, useActiveAccount } from "thirdweb/react";
import { Wallet } from "lucide-react";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

const ConnectPage = () => {
  const router = useRouter();
  const account = useActiveAccount();

  useEffect(() => {
    if (account) {
      router.push("/");
    }
  }, [account, router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-[#0f0f13] rounded-xl border border-[#2a2a3a] shadow-xl overflow-hidden p-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center mb-6">
            <Wallet className="h-10 w-10 text-[#8b5cf6]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h1>
          <p className="text-[#a1a1aa] text-center">
            Connect your wallet to access your housing information and manage your account.
          </p>
        </div>

        <div className="flex justify-center">
          <ConnectButton
            client={client}
            theme={darkTheme({
              colors: {
                primaryButtonBg: "#8b5cf6",
                primaryButtonText: "white",
              },
            })}
          />
        </div>

        <div className="text-center text-xs text-[#71717a] mt-6">
          <p>Your wallet connection is secure and encrypted.</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;