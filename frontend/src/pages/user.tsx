import { useEffect } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { Image, Heading, HStack, VStack } from '@chakra-ui/react';
import { addressShortener } from '../utils';
import { abi, contractAddresses } from '../common/constants';

function User() {

  const { chainId: chainIdHex, isWeb3EnableLoading, isWeb3Enabled, account } = useMoralis();
  const chainId = parseInt(chainIdHex || '0x0').toString() as keyof typeof contractAddresses;

  const leafiumContractAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const { runContractFunction: getMyGateways } = useWeb3Contract({
    abi,
    contractAddress: leafiumContractAddress!,
    functionName: 'getMyGateways'
  });

  const router = useRouter();

  useEffect(() => {
    if(!isWeb3EnableLoading && !isWeb3Enabled) {
      router.push('/');
    }else {
      getMyGateways().then(r => console.log(r));
    }
  }, [isWeb3EnableLoading, isWeb3Enabled, account]);

  if(account) {
    return (
      <>
        <Navbar />
        <VStack py={10} px={[5, 5, 10, 32]} align="start" gap={4}>
          <HStack gap={2} align="baseline">
            <Image w={10} h={10} src={`https://avatars.dicebear.com/api/identicon/${account}.svg`} />
            <Heading size="lg">{addressShortener(account)}</Heading>
          </HStack>
          <Heading>Your devices</Heading>
        </VStack>
      </>
    );
  }
}

export default User;