import { Card, CardBody, CardHeader, Divider, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { ArrowTrendingUpIcon, CurrencyDollarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { RadioReceiver } from 'lucide-react';
import { GatewayPosition } from '../utils/types';

function DeviceCard({ name, locality, altitude }  : GatewayPosition) {
  return (
    <Card borderRadius="lg" bg="gray.900" color="white" justifySelf="center" w="sm" maxW="md" boxShadow="lg" transition="ease 0.2s" _hover={{ transform: 'scale(1.01)' }}>
      <CardHeader pb={4}>
        <HStack fontWeight='bold' fontSize="x-large" >
          <RadioReceiver size={50}/>
          <Text>{name}</Text>
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
          </HStack >
          <HStack>
            <Icon as={CurrencyDollarIcon} h="6" w="6" color="purple.400" />
            <Text fontSize="lg">50 LFM</Text>
          </HStack >
        </VStack>
      </CardBody>
    </Card>
  );
}

export default DeviceCard;