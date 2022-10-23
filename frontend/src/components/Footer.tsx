import { HStack, VStack, Heading, Link } from '@chakra-ui/react';
import { Leaf } from 'lucide-react';

function Footer() {
  return (
    <VStack px={[5, 5, 10, 32]} py={20} gap={4} bg="gray.900" align="start">
      <HStack align="center">
        <Leaf size={32} strokeWidth="2" />
        <Heading size="xl">Leafium</Heading>
      </HStack>
      <HStack gap={[2, 2, 4, 8]}>
        <Link>Privacy Policy</Link>
        <Link>Hotspot Limited Warrantly</Link>
        <Link>Terms and Conditions</Link>
      </HStack>
    </VStack>
  );
}

export default Footer;