import { HStack, VStack, Badge, Icon, Box, Text, Flex, Spacer, Button } from '@chakra-ui/react';
import { RadioReceiver } from 'lucide-react';
import { MapPinIcon, CurrencyDollarIcon, ArrowTrendingUpIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { GatewayPosition } from '../utils/types';

function DeviceCard({ name, locality, altitude }  : GatewayPosition) {
  return (
    <Box padding={5} textAlign="left" alignItems="left" borderRadius="lg" bg="gray.100" w="md" maxW="xl" boxShadow="lg" >
      <Box color='gray.900' fontWeight='bold' fontSize="x-large" > <Badge color="gray.900" > <RadioReceiver size={50} /></Badge > {name} </Box>
      <VStack alignItems="left" >
        <HStack><Icon as={MapPinIcon} h="6" w="6" color="purple.500" /> <Text color="gray.900" fontSize="lg" > {locality} </Text></HStack >
        <HStack><Icon as={ArrowTrendingUpIcon} h="6" w="6" color="purple.500" /> <Text color="gray.900" fontSize="lg" > {altitude} </Text></HStack >
        <HStack><Icon as={CurrencyDollarIcon} h="6" w="6" color="purple.500" /> <Text color="gray.900" fontSize="lg" > 50 LFM </Text></HStack >
      </VStack>
    </Box>
  );
}

export default DeviceCard;