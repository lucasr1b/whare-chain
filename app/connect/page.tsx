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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-card rounded-xl border border-border shadow-xl overflow-hidden p-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
            <Wallet className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Connect Your Wallet</h1>
          <p className="text-muted-foreground text-center">
            Connect your wallet to access your housing information and manage your account.
          </p>
        </div>

        <div className="flex justify-center">
          <ConnectButton
            client={client}
            theme={darkTheme({
              colors: {
                primaryButtonBg: "hsl(34 96% 52%)",
                primaryButtonText: "white",
              },
            })}
          />
        </div>

        <div className="text-center text-xs text-muted-foreground mt-6">
          <p>Your wallet connection is secure and encrypted.</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;