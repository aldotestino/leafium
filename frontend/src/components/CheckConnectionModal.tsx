import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ConnectButton from './ConnectButton';

interface CheckConnectionModalProps {
  isOpen: boolean
}

function CheckConnectionModal({ isOpen }: CheckConnectionModalProps) {

  const router = useRouter();

  return (
    <Modal isOpen={isOpen} onClose={() => null}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>You are not connected to a wallet!</ModalHeader>
        <ModalBody>
            In order to add your Gateway and gain LFM tokens you need to connect your Metamask wallet.
        </ModalBody>

        <ModalFooter>
          <Button mr={3} variant="outline" colorScheme="red" onClick={() => router.push('/')}>Cancel</Button>
          <ConnectButton />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CheckConnectionModal; 