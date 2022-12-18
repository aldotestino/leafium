import { Card, CardBody, CardHeader, Divider, HStack, Icon, IconButton, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { ArrowTrendingUpIcon, CpuChipIcon, CurrencyDollarIcon, GlobeAltIcon, MapPinIcon, TrashIcon,  } from '@heroicons/react/24/outline';
import { Gateway } from '../utils/types';
import { SignalIcon, SignalSlashIcon } from '@heroicons/react/24/outline';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { abi, contractAddresses } from '../common/constants';
import { isTx } from '../utils';
import { useSteps } from 'chakra-ui-steps';
import { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

interface DeviceCardProps {
  gateway: Gateway
  removeLocalGateway: (gatewayId: string) => void
}

function DeviceCard({ gateway, removeLocalGateway }  : DeviceCardProps) {

  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex || '0x0').toString() as keyof typeof contractAddresses;
  const leafiumContractAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const { runContractFunction: removeGateway, isLoading, isFetching } = useWeb3Contract({
    abi,
    contractAddress: leafiumContractAddress!,
    functionName: 'removeGateway',
    params: {}
  });

  const { nextStep, activeStep, reset } = useSteps({
    initialStep: 0
  });
  const toast = useToast();
  const [transactionHash, setTransactionHash] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function onRemove() {
    onOpen();
    await removeGateway({
      onError: (e) => {
        toast({
          title: 'Error',
          description: 'Gateway doesn\'t exist!',
          duration: 5000,
          isClosable: true,
          status: 'error',
          position: 'top-right'
        });
        onClose();
      },
      onSuccess: async (tx) => {
        nextStep();
        if(isTx(tx)) {
          setTransactionHash(tx.hash);
          await tx.wait(1);
          nextStep();
        }
      },
      params: {
        params: {
          gatewayId: gateway.id
        }
      }
    });
  }

  function onHandleClose() {
    removeLocalGateway(gateway.id);
    onClose();
  }

  return (
    <>
      <Popover placement="bottom">
        <PopoverTrigger>
          <Card borderRadius="lg" bg="gray.900" color="white" justifySelf="center" w="sm" maxW="md" boxShadow="lg" transition="ease 0.2s" _hover={{ transform: 'scale(1.01)' }}>
            <CardHeader pb={4}>
              <HStack justifyContent="space-between" fontWeight='bold' fontSize="x-large" >
                <HStack align="center">
                  <Icon as={CpuChipIcon} h="14" w="14" />
                  <VStack spacing={0} align="start">
                    <Text noOfLines={1}>{gateway.name}</Text>
                    <Text as='samp' fontSize='xs' fontWeight={1}>{gateway.id}</Text>
                  </VStack>
                </HStack>
                {gateway.isOffline ? 
                  <Icon as={SignalSlashIcon} h="10" w="10" color="red.400" /> :
                  <Icon as={SignalIcon} h="10" w="10" color="green.400" />  
                }
              </HStack>
            </CardHeader>
            <Divider />
            <CardBody pt={4}>
              <VStack alignItems="left">
                <HStack>
                  <Icon as={MapPinIcon} h="6" w="6" color="purple.400" />
                  <Text fontSize="lg">{gateway.locality}</Text>
                </HStack>
                <HStack>
                  <Icon as={ArrowTrendingUpIcon} h="6" w="6" color="purple.400" />
                  <Text fontSize="lg">{gateway.altitude}</Text>
                </HStack>
                <HStack>
                  <Icon as={GlobeAltIcon} h="6" w="6" color="purple.400" />
                  <Text fontSize="lg">{gateway.lat} {gateway.long}</Text>
                </HStack>
                <HStack>
                  <Icon as={CurrencyDollarIcon} h="6" w="6" color="purple.400" />
                  <Text fontSize="lg">{gateway.earnings} LFM</Text>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <HStack justify="space-between">
              <Text>Remove Gateway</Text>
              <IconButton isLoading={isLoading} onClick={onRemove} aria-label={'delete gateway'} background="red.400" _hover={{ background: 'red.500' }} _focus={{ background: 'red.600' }} color="white" icon={<Icon as={TrashIcon} w={4} h={4} />} />
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <ConfirmationModal activeStep={activeStep} resetSteps={reset} transactionHash={transactionHash} isOpen={isOpen} onClose={onHandleClose} />
    </>
  );
}

export default DeviceCard;