import { Box, Divider, Text, Heading, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Input, VStack, Icon, Tag } from '@chakra-ui/react';
import { ArrowTrendingUpIcon, CpuChipIcon, CurrencyDollarIcon, GlobeAltIcon, MapPinIcon, SignalIcon, SignalSlashIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { trpc } from '../common/client/trpc';
import { isOffline } from '../utils';
import { Gateway } from '../utils/types';

interface DeviceSidebarProps {
  onClose: () => void
  isOpen: boolean
  gateway: Gateway
}

function DeviceSidebar({ onClose, isOpen, gateway }: DeviceSidebarProps) {

  const reversePosition = trpc.useMutation(['position.reverse']);
  useEffect(() => {
    if(gateway) {
      reversePosition.mutateAsync({
        coordinates: [
          { lat: gateway?.lat.toString(), long: gateway?.long.toString() }
        ]
      }).then(({ data: { locations } }) => {
        gateway.locality = locations[0];
      });
    }
  }, [gateway]);

  return (
    <Drawer placement="left" size="sm" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <VStack align="start">
            <HStack justify="space-between" w="full">
              <Heading>{gateway?.name}</Heading>
              {isOffline(gateway?.updatedAt) ? 
                <Icon as={SignalSlashIcon} h="10" w="10" color="red.400" /> :
                <Icon as={SignalIcon} h="10" w="10" color="green.400" />  
              }
            </HStack>
            <HStack justify="space-between" w="full">
              <HStack>
                <Icon as={CpuChipIcon} h="6" w="6" color="purple.400" />
                <Text>Bobcat</Text>
              </HStack>
              <HStack>
                <Tag bg="gray.600" color="teal.400" borderRadius="full">LoRaWAN</Tag>
                <Tag bg="gray.600" color="orange.400" borderRadius="full">5G</Tag>
              </HStack>
            </HStack>
          </VStack>
        </DrawerHeader>
        <Divider />
        <DrawerBody mt={4}>
          <Box bg="gray.600" p={4} borderRadius="lg">
            <VStack alignItems="left">
              <Heading size="lg">Position</Heading>
              <HStack>
                <Icon as={MapPinIcon} h="6" w="6" color="purple.400" />
                <Text fontSize="lg">{gateway?.locality || ''}</Text> 
              </HStack>
              <HStack>
                <Icon as={ArrowTrendingUpIcon} h="6" w="6" color="purple.400" />
                <Text fontSize="lg">{gateway?.altitude}</Text>
              </HStack>
              <HStack>
                <Icon as={GlobeAltIcon} h="6" w="6" color="purple.400" />
                <Text fontSize="lg">{gateway?.lat} {gateway?.long}</Text>
              </HStack>
            </VStack>
          </Box>
          <Box mt={4} bg="gray.600" p={4} borderRadius="lg">
            <VStack alignItems="left">
              <Heading size="lg">Earnings</Heading>
              <HStack>
                <Icon as={CurrencyDollarIcon} h="6" w="6" color="purple.400" />
                <Text fontSize="xl">
                  {gateway?.earnings}
                  <Text as="span" bgGradient="linear(to-r, purple.500 50%, blue.500)" bgClip="text" display="inline"> LFM</Text>
                </Text>
              </HStack>
            </VStack>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default DeviceSidebar;