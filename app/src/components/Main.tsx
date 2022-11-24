import { Heading, HStack, VStack, Box, Text, Button, Image, useMediaQuery } from '@chakra-ui/react';
import { Map, RadioReceiver } from 'lucide-react';
import Navbar from './Navbar';
import NextLink from 'next/link';

function Main() {

  const [isLg] = useMediaQuery('(min-width: 62em)');

  return (
    <Box minH="100vh" position="relative">
      <Navbar />
      <HStack px={[5, 5, 10, 32]} w="full" justify="space-between">
        <VStack align="start" gap={8} pt={!isLg ? 24 : 0}>
          <Box maxW="xl">
            <Heading size="3xl">
          A modern 
              <Text bgGradient="linear(to-r, purple.500 50%, blue.500)" bgClip="text" display="inline">{' '}LoRaWAN{' '}</Text>
          infrastructure based on
              <Text bgGradient="linear(to-r, purple.500 50%, blue.500)" bgClip="text" display="inline">{' '}Blockchain</Text>
            </Heading>
          </Box>
          <HStack gap={4}>
            <NextLink href="/device_map" passHref>
              <Button colorScheme="purple" leftIcon={<Map />}>View map</Button>
            </NextLink>
            <NextLink href="/register_device" passHref>
              <Button colorScheme="purple" variant="outline" leftIcon={<RadioReceiver />}>Register device</Button>
            </NextLink>
          </HStack>
        </VStack>
        {isLg && <Image zIndex={-2} src='./illustration.svg' />}
      </HStack>
      <div className="custom-shape-divider-bottom-1666547358">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>
    </Box>
  );
}

export default Main;