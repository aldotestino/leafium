import { Button, Center, Heading, HStack, Icon, Image, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { BigNumber } from 'ethers';
import { RadioReceiver } from 'lucide-react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { trpc } from '../common/client/trpc';
import { abi, contractAddresses } from '../common/constants';
import DeviceCard from '../components/DeviceCard';
import Navbar from '../components/Navbar';
import { addressShortener, isOffline } from '../utils';
import { Gateway } from '../utils/types';

function User() {

  const { chainId: chainIdHex, isWeb3EnableLoading, isWeb3Enabled, account } = useMoralis();
  const chainId = parseInt(chainIdHex || '0x0').toString() as keyof typeof contractAddresses;

  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(true);

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

  function removeLocalGateway(gatewayId: string) {
    setGateways(ps => ps.filter(g => g.id !== gatewayId));
  }

  useEffect(() => {
    setLoading(true);
    if (!isWeb3EnableLoading && !isWeb3Enabled) {
      router.push('/');
    } else {
      getMyGateways().then(r => {
        reversePosition.mutateAsync({
          coordinates: (r as any[]).map(({ lat, long, id }) => ({ gatewayId: id, lat: lat.toString(), long: long.toString() }))
        }).then(({ data: { locations } }) => {
          setGateways((r as any[]).map((g: any, i) => ({
            id: g.id,
            name: g.name,
            lat: parseFloat(g.lat),
            long: parseFloat(g.long),
            altitude: parseInt(g.altitude),
            earnings: parseInt(g.earnings),
            updatedAt: parseInt(g.updatedAt),
            isOffline: isOffline(g.updatedAt),
            locality: locations[g.id]
          } as Gateway)
          ));
          setLoading(false);
        });
      });
      getBalance().then(b => 
        setBalance((b as BigNumber).toString())
      );
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
            {(balance && !loading) && 
              <Text fontSize="xl">{balance.length > 1 ? balance.substring(0, balance.length - 18) : balance}
                <Text as="span" bgGradient="linear(to-r, purple.500 50%, blue.500)" bgClip="text" display="inline"> LFM</Text>
              </Text>
            }
          </HStack>
          <Heading size="lg">Your devices</Heading>

          {loading ?
            <Center w="100%">
              <Spinner size="lg" color="purple.200" />
            </Center> :
            <>
              {gateways.length > 0 ? 
                <SimpleGrid w="full" gap={4} columns={[1, 1, 1, 2, 3]}>
                  {gateways.map((g, i) =>
                    <DeviceCard key={i} gateway={g} removeLocalGateway={removeLocalGateway} />
                  )}
                </SimpleGrid> :
                <Center w="100%">
                  <VStack gap={5}>
                    <HStack>
                      <Icon as={FaceFrownIcon} w={10} h={10}/>
                      <Heading size="md" mt={5}> No Registered Device</Heading>
                    </HStack>
                    <NextLink href="/register_device" passHref>
                      <Button colorScheme="purple" variant="outline" leftIcon={<RadioReceiver />}>Register device</Button>
                    </NextLink>
                  </VStack>
                </Center>
              }
            </>
          }

        </VStack>
      </>
    );
  }
}

export default User;