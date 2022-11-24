import { HStack, VStack, Icon, Text, Card, CardHeader, CardBody } from '@chakra-ui/react';
import { RadioReceiver } from 'lucide-react';
import { MapPinIcon, CurrencyDollarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { GatewayPosition } from '../utils/types';

function DeviceCard({ name, locality, altitude }  : GatewayPosition) {
  return (
    <Card borderRadius="lg" bg="gray.900" w="md" maxW="xl" boxShadow="lg" >
      <CardHeader>
        <HStack color="white" fontWeight='bold' fontSize="x-large" >
          <RadioReceiver size={50}/>
          <Text >{name}</Text>
        </HStack>
      </CardHeader>
      <CardBody>
        <VStack alignItems="left" color="white">
          <HStack>
            <Icon as={MapPinIcon} h="6" w="6" color="purple.500" />
            <Text fontSize="lg" >{locality}</Text>
          </HStack >
          <HStack>
            <Icon as={ArrowTrendingUpIcon} h="6" w="6" color="purple.500" />
            <Text fontSize="lg">{altitude}</Text>
          </HStack >
          <HStack><Icon as={CurrencyDollarIcon} h="6" w="6" color="purple.500" />
            <Text fontSize="lg">50 LFM</Text>
          </HStack >
        </VStack>
      </CardBody>
    </Card>
  );
}

export default DeviceCard;