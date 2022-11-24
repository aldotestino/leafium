import { Button } from '@chakra-ui/react';
import { Wallet } from 'lucide-react';
import { useMoralis } from 'react-moralis';

function ConnectButton() {

  const { enableWeb3 } = useMoralis();

  return (
    <Button leftIcon={<Wallet />} onClick={async () => {
      await enableWeb3();
    }} colorScheme="purple">
      Connect wallet
    </Button>
  );
}

export default ConnectButton;