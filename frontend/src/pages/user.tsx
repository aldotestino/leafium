import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { Image, Heading, HStack, VStack } from '@chakra-ui/react';
import { addressShortener } from '../utils';

function User() {

  const { isWeb3EnableLoading, isWeb3Enabled, account } = useMoralis();
  const router = useRouter();

  useEffect(() => {
    if(!isWeb3EnableLoading && !isWeb3Enabled) {
      router.push('/');
    }
  }, [isWeb3EnableLoading, isWeb3Enabled]);

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