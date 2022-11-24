import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Button, Heading, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, VStack } from '@chakra-ui/react';
import { CheckCircleIcon, CubeTransparentIcon } from '@heroicons/react/24/outline';
import { Step, Steps } from 'chakra-ui-steps';

const steps = [
  { label: 'Step 1', description: 'Transfer', icon: CubeTransparentIcon },
  { label: 'Step 2', description: 'Confirmation', icon: CheckCircleIcon },
];

interface ConfirmationModelProps {
  isOpen: boolean,
  onClose: () => void
  activeStep: number
  transactionHash: string
  resetSteps: () => void
}

function ConfirmationModal({ isOpen, onClose, activeStep, transactionHash, resetSteps }: ConfirmationModelProps) {

  function handleClose() {
    onClose();
    resetSteps();
  }

  const contents = [
    <VStack key={0} mt={4}>
      <Heading fontSize="2xl">Starting transaction...</Heading>
    </VStack>,
    <VStack key={1} mt={4}>
      <Heading fontSize="2xl">Waiting for confimation...</Heading>
      <Text fontSize="xl">View transaction on Etherscan:</Text>
      <Link _hover={{ color: 'purple.200', textDecoration: 'underline' }} href={`https://goerli.etherscan.io/tx/${transactionHash}`} isExternal>
        {transactionHash.slice(0, 6)}...{transactionHash.slice(transactionHash.length - 6)} <ExternalLinkIcon mx='2px' />
      </Link>
    </VStack>,
    <VStack key={2} mt={4}>
      <Heading fontSize="2xl">Transaction completed!</Heading>
      <Text fontSize="xl">View transaction on Etherscan:</Text>
      <Link _hover={{ color: 'purple.200', textDecoration: 'underline' }} href={`https://goerli.etherscan.io/tx/${transactionHash}`} isExternal>
        {transactionHash.slice(0, 6)}...{transactionHash.slice(transactionHash.length - 6)} <ExternalLinkIcon mx='2px' />
      </Link>
    </VStack>,
  ];

  return (
    <Modal size="lg" isOpen={isOpen} closeOnEsc={false} closeOnOverlayClick={false} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody pt={4}>
          <Steps colorScheme="purple" labelOrientation='vertical' activeStep={activeStep}>
            {steps.map(({ label, description, icon }) => (
              <Step description={description} label={label} key={label} icon={icon}></Step>
            ))}
          </Steps>
          {contents[activeStep]}
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button disabled={activeStep < 2} colorScheme="purple" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmationModal;