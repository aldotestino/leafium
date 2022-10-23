import { Button, Heading, HStack, Link, useMediaQuery } from '@chakra-ui/react';
import { Leaf } from 'lucide-react';
import { Wallet } from 'lucide-react';

function Navbar() {

  const [isLg] = useMediaQuery('(min-width: 62em)');
  const [isXl] = useMediaQuery('(min-width: 80em)');

  return (
    <HStack px={[5, 5, 10, 32]} w="full" py="8" align="center" justify="space-between">
      <HStack gap={20} align="baseline">
        <HStack align="center">
          <Leaf size={36} strokeWidth={3} />
          {isLg && <Heading size="2xl">Leafium</Heading>}
        </HStack>
        {isXl && <HStack gap={6} fontSize="xl">
          <Link href='#uc'>Use cases</Link>
          <Link href='#sd'>Supported devices</Link>  
        </HStack>}
      </HStack>
      <Button rounded="full" leftIcon={<Wallet />} colorScheme="purple">
        Connect wallet
      </Button>
    </HStack>
  );
}

export default Navbar;