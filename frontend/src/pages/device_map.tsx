import { HStack, Input, Link, InputGroup, InputLeftElement, Spinner, Center } from '@chakra-ui/react';
import { Leaf, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import Map from 'react-map-gl';
import NextLink from 'next/link';

interface Position {
  lat: number
  long: number
}

function DeviceMap() {

  const [pos, setPos] = useState<Position | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setPos({
        lat: parseFloat(coords.latitude.toFixed(2)),
        long: parseFloat(coords.longitude.toFixed(2))
      });
    });
  }, []);


  return (
    <>
      {pos ? 
        <>
          <HStack align="center" p={10} pos="fixed" top={0} w="full" zIndex={10} justify="space-between">
            <NextLink href="/" passHref>
              <Leaf cursor="pointer" size={36} strokeWidth={3} />
            </NextLink>
            <HStack align="center" gap={10}>
              <Link>Register your Device</Link>
              <InputGroup w="xs">
                <InputLeftElement>
                  <Search size="20" />
                </InputLeftElement>
                <Input rounded="full" variant="filled" focusBorderColor='purple.400' placeholder='Search location' />
              </InputGroup>
            </HStack>   
          </HStack>
          <Map
            initialViewState={{
              longitude: pos?.long,
              latitude: pos?.lat,
              zoom: 14
            }}
            style={{ width: '100vw', height: '100vh' }}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/dark-v10"
          />
        </> :
        <Center height="100vh">
          <Spinner size="lg" color="purple.200" />
        </Center>}
    </>
  );
}

export default DeviceMap;