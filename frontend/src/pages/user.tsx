import { useEffect, useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { Image, Heading, HStack, VStack, Badge, Icon } from '@chakra-ui/react';
import { addressShortener } from '../utils';
import { abi, contractAddresses } from '../common/constants';
import { SimpleGrid, Box, Text } from '@chakra-ui/react';
import { RadioReceiver } from 'lucide-react';
import { MapPinIcon, CurrencyDollarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { GatewayPosition } from '../utils/types';
import { trpc } from '../common/client/trpc';
import { BigNumber } from 'ethers';

interface DeviceUserProps {
  gateways: GatewayPosition[]
}

interface Position {
  administrative_area: string, 
  region: string, 
  country : string
}

function User() {

  const [pos, setPos] = useState<Position | null>();
  const { chainId: chainIdHex, isWeb3EnableLoading, isWeb3Enabled, account } = useMoralis();
  const chainId = parseInt(chainIdHex || '0x0').toString() as keyof typeof contractAddresses;

  const leafiumContractAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const { runContractFunction: getMyGateways } = useWeb3Contract({
    abi,
    contractAddress: leafiumContractAddress!,
    functionName: 'getMyGateways'
  });

  const { runContractFunction: getBalance } = useWeb3Contract({
    abi,
    contractAddress: leafiumContractAddress!,
    functionName: 'getBalance'
  });

  const router = useRouter();

  const { refetch, isLoading } = trpc.useQuery(['position.reverse', { locations: ['41.14122051151266', '16.418935530898487'] }], {
    enabled: false
  });
  
  async function Reverse() {
    const { data } = await refetch();
    const x = {
      administrative_area: data?.data.administrative_area, 
      region: data?.data.region, 
      country : data?.data.country
    };
    console.log(x);
  }

  useEffect(() => {{
    try {
      Reverse();
    } catch (err: any) {
      console.log(err);
    }
  }}, []);

  useEffect(() => {
    if (!isWeb3EnableLoading && !isWeb3Enabled) {
      router.push('/');
    } else {
      getMyGateways().then(r => console.log(r));
      getBalance().then(b => console.log((b as BigNumber).toString()));
    }
  }, [isWeb3EnableLoading, isWeb3Enabled, account]);

  if (account) {
    return (
      <>
        <Navbar />
        <VStack py={10} px={[5, 5, 10, 32]} align="start" gap={4}>
          <HStack gap={2} align="baseline">
            <Image w={10} h={10} src={`https://avatars.dicebear.com/api/identicon/${account}.svg`} />
            <Heading size="lg">{addressShortener(account)}</Heading>
          </HStack>
          <Heading>Your devices</Heading>

          <SimpleGrid w="full" gap={20} columns={[1, 1, 1, 2, 3]}>

            <Box padding={5} textAlign="left" alignItems="left" borderRadius="lg" bg="gray.100" w="md" maxW="xl" boxShadow="lg">
              <Box color='gray.900' fontWeight='bold' fontSize="x-large"><Badge color="gray.900"><RadioReceiver size={50} /></Badge> Proud Poultry</Box>
              <VStack alignItems="left">
                <HStack><Icon as={MapPinIcon} h="6" w="6" color="purple.500" /><Text color="gray.900" fontSize="lg"> Corato, Puglia, Italy</Text></HStack>
                <HStack><Icon as={ArrowTrendingUpIcon} h="6" w="6" color="purple.500" /><Text color="gray.900" fontSize="lg"> 290m</Text></HStack>
                <HStack><Icon as={CurrencyDollarIcon} h="6" w="6" color="purple.500" /><Text color="gray.900" fontSize="lg"> 50 LFM</Text></HStack>
              </VStack>
            </Box>

          </SimpleGrid>

        </VStack>
      </>
    );
  }
}

export default User;