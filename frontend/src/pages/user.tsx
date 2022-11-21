import { useEffect, useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { Image, Heading, HStack, VStack, Badge, Icon, Center, Spinner, SimpleGrid, Text, Button } from '@chakra-ui/react';
import { addressShortener } from '../utils';
import { abi, contractAddresses } from '../common/constants';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { GatewayPosition } from '../utils/types';
import { trpc } from '../common/client/trpc';
import { BigNumber } from 'ethers';
import DeviceCard from '../components/DeviceCard';
import { RadioReceiver } from 'lucide-react';
import NextLink from 'next/link';

function User() {

  const { chainId: chainIdHex, isWeb3EnableLoading, isWeb3Enabled, account } = useMoralis();
  const chainId = parseInt(chainIdHex || '0x0').toString() as keyof typeof contractAddresses;

  const [gateways, setGateways] = useState<GatewayPosition[]>([]);
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(true);

  //console.log(gateways);
  //console.log(balance.toString());

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
    setLoading(true);
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
          setLoading(false);
        });
      });
      getBalance().then(b => {
        //console.log((b as BigNumber).toString())
        setBalance((b as BigNumber).toString());
      });
    }
  }, [isWeb3EnableLoading, isWeb3Enabled, account]);

  if (account) {
    return (
      <>
        <Navbar />
        <VStack py={10} px={[5, 5, 10, 32]} align="start" gap={4}>
          <HStack gap={50} align="baseline"><HStack gap={2} align="baseline">
            <Image w={10} h={10} src={`https://avatars.dicebear.com/api/identicon/${account}.svg`} />
            <Heading size="lg">{addressShortener(account)}</Heading>
          </HStack>
          {balance && !loading && <Heading size="lg">Total Balance:  {balance.length > 1 ? balance.substring(0, balance.length - 18) : balance} <Text bgGradient="linear(to-r, purple.500 50%, blue.500)" bgClip="text" display="inline">LFM</Text></Heading>}
          </HStack>
          <Heading>Your devices</Heading>

          {loading ?
            <Center w="100%">
              <Spinner size="lg" color="purple.200" />
            </Center> :
            <>
              {gateways.length > 0 ? <SimpleGrid w="full" gap={20} columns={[1, 1, 1, 1, 2, 3]}>

                {gateways.map((g, i) =>
                  <DeviceCard key={i} {...g} />
                )}

              </SimpleGrid> :
                <Center w="100%">

                  <VStack gap={5}>
                    <Heading size="md" mt={5}><Icon as={FaceFrownIcon} /> No Registered Device</Heading>
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