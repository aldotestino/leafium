import { Card, CardBody, CardHeader, Divider, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { ArrowTrendingUpIcon, CpuChipIcon, CurrencyDollarIcon, GlobeAltIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Gateway } from '../utils/types';
import { isOffline } from '../utils';
import {SignalIcon, SignalSlashIcon } from '@heroicons/react/24/outline';

function DeviceCard({ id, name, locality, altitude, lat, long, earnings, updatedAt }  : Gateway) {
  console.log(updatedAt);

  return (
    <Card borderRadius="lg" bg="gray.900" color="white" justifySelf="center" w="sm" maxW="md" boxShadow="lg" transition="ease 0.2s" _hover={{ transform: 'scale(1.01)' }}>
      <CardHeader pb={4}>
        <HStack justifyContent="space-between" fontWeight='bold' fontSize="x-large" >
          <HStack align="center">
            <Icon as={CpuChipIcon} h="14" w="14" />
            <VStack spacing={0} align="start">
              <Text noOfLines={1}>{name}</Text>
              <Text as='samp' fontSize='xs' fontWeight={1}>{id}</Text>
            </VStack>
          </HStack>
          {isOffline(updatedAt) ? 
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
            <Text fontSize="lg">{locality}</Text>
          </HStack>
          <HStack>
            <Icon as={ArrowTrendingUpIcon} h="6" w="6" color="purple.400" />
            <Text fontSize="lg">{altitude}</Text>
          </HStack>
          <HStack>
            <Icon as={GlobeAltIcon} h="6" w="6" color="purple.400" />
            <Text fontSize="lg">{lat} {long}</Text>
          </HStack>
          <HStack>
            <Icon as={CurrencyDollarIcon} h="6" w="6" color="purple.400" />
            <Text fontSize="lg">{earnings} LFM</Text>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
}

export default DeviceCard;