import { client } from '@/lib/thirdWebClient';
import { ConnectButton } from "thirdweb/react";

const ConnectPage = () => {
  return (
    <div>
      <ConnectButton client={client} />
    </div>
  );
};

export default ConnectPage;