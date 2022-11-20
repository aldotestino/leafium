import { useEffect, useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { Image, Heading, HStack, VStack, Badge, Icon, Center, Spinner } from '@chakra-ui/react';
import { addressShortener } from '../utils';
import { abi, contractAddresses } from '../common/constants';
import { SimpleGrid, Box, Text } from '@chakra-ui/react';
import { RadioReceiver } from 'lucide-react';
import { MapPinIcon, CurrencyDollarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { GatewayPosition } from '../utils/types';
import { trpc } from '../common/client/trpc';
import { BigNumber } from 'ethers';

function User() {

  const { chainId: chainIdHex, isWeb3EnableLoading, isWeb3Enabled, account } = useMoralis();
  const chainId = parseInt(chainIdHex || '0x0').toString() as keyof typeof contractAddresses;

  const [gateways, setGateways] = useState<GatewayPosition[]>([]);

  console.log(gateways);

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

  const reversePosition = trpc.useMutation(['position.reverse']);

  useEffect(() => {
    if (!isWeb3EnableLoading && !isWeb3Enabled) {
      router.push('/');
    } else {
      getMyGateways().then(r => {
        reversePosition.mutateAsync({
          coordinates: (r as any[]).map(({ lat, long }) => ({ lat: lat.toString(), long: long.toString() }))
        }).then(({ data: { locations } }) => {
          setGateways((r as any[]).map((g: any, i) => ({
            id: g.id,
            name: g.name,
            lat: parseFloat(g.lat),
            long: parseFloat(g.long),
            altitude: parseInt(g.altitude),
            locality: locations[i]
          } as GatewayPosition)
          ));
        });
      });
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

          {gateways.length > 0 ? <SimpleGrid w="full" gap={20} columns={[1, 1, 1, 2, 3]}>

            {gateways.map((g, i) => 
              <Box key={i} padding={5} textAlign="left" alignItems="left" borderRadius="lg" bg="gray.100" w="md" maxW="xl" boxShadow="lg">
                <Box color='gray.900' fontWeight='bold' fontSize="x-large"><Badge color="gray.900"><RadioReceiver size={50} /></Badge>{g.name}</Box>
                <VStack alignItems="left">
                  <HStack><Icon as={MapPinIcon} h="6" w="6" color="purple.500" /><Text color="gray.900" fontSize="lg">{g.locality}</Text></HStack>
                  <HStack><Icon as={ArrowTrendingUpIcon} h="6" w="6" color="purple.500" /><Text color="gray.900" fontSize="lg">{g.altitude}</Text></HStack>
                  <HStack><Icon as={CurrencyDollarIcon} h="6" w="6" color="purple.500" /><Text color="gray.900" fontSize="lg"> 50 LFM</Text></HStack>
                </VStack>
              </Box>
            )}

          </SimpleGrid> : 
            <Center w="100%">
              <Spinner size="lg" color="purple.200" />
            </Center>
          }

        </VStack>
      </>
    );
  }
}

export default User;