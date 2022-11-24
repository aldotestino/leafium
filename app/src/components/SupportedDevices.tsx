import { Heading, HStack, Link, Table, TableContainer, Tag, Tbody, Td, Tr, VStack } from '@chakra-ui/react';
import { SupportedDevice, supportedDevices } from '../utils/data';

function SupportedDevices() {
  return (
    <VStack id='sd' py={20} gap={10} px={[5, 5, 10, 32]} bg="gray.100">
      <Heading color="gray.800">Supported devices</Heading>
      <TableContainer bg="gray.900" borderRadius="lg" boxShadow="dark-lg">
        <Table size="lg" variant='simple'>
          <Tbody>
            {supportedDevices.map((d, i) => <SupportedDeviceRow key={i} {...d}/>)}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}

function SupportedDeviceRow({ deviceName, tags, links }: SupportedDevice) {

  const linkToHoverColor = {
    purchase: 'blue.400',
    community: 'green.400',
    support: 'purple.400'
  };

  return (
    <Tr>
      <Td fontWeight="semibold">{deviceName}</Td>
      <Td>
        <HStack gap={1}>
          {tags.map((t, i) => <Tag key={i} bg="gray.600" color={i === 0 ? 'teal.400' : 'orange.400'} borderRadius="full">{t}</Tag>)}
        </HStack>
      </Td>
      <Td>
        <HStack gap={2}>
          {Object.entries(links).map(([k, v]) => 
            <Link _hover={{ color: linkToHoverColor[k as 'purchase' | 'community' | 'support'] }} 
              color="gray.400" fontWeight="semibold" 
              key={k}
            >
              {v}
            </Link>
          )}
        </HStack>
      </Td>
    </Tr>
  );
}

export default SupportedDevices;