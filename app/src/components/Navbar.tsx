import { Button, Heading, HStack, Link, useMediaQuery } from '@chakra-ui/react';
import { Leaf, User } from 'lucide-react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useMoralis } from 'react-moralis';
import { addressShortener } from '../utils';
import ConnectButton from './ConnectButton';

function Navbar() {

  const [isLg] = useMediaQuery('(min-width: 62em)');
  const [isXl] = useMediaQuery('(min-width: 80em)');
  const { pathname } = useRouter();
  
  const { account, isWeb3Enabled } = useMoralis();

  return (
    <HStack px={[5, 5, 10, 32]} w="full" py="8" align="center" justify="space-between">
      <HStack gap={20} align="baseline">
        <HStack align="center">
          <NextLink href="/" passHref>
            <Leaf size={36} strokeWidth={3} cursor="pointer" />
          </NextLink>
          {isLg && <Heading size="2xl">Leafium</Heading>}
        </HStack>
        {(isXl && pathname === '/') && <HStack gap={6} fontSize="xl">
          <Link href='#uc'>Use cases</Link>
          <Link href='#sd'>Supported devices</Link>  
        </HStack>}
      </HStack>
      {(!isWeb3Enabled || !account) ? 
        <ConnectButton />
        : 
        <NextLink href="/user" passHref>
          <Button leftIcon={<User />} colorScheme="purple">
          Welcome {addressShortener(account)}
          </Button>
        </NextLink>
      }
    </HStack>
  );
}

export default Navbar;