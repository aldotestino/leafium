import { HStack, Input, Link, InputGroup, InputLeftElement, Spinner, Center, useMediaQuery, Box } from '@chakra-ui/react';
import { Leaf } from 'lucide-react';
import { Search2Icon } from '@chakra-ui/icons';
import { FormEvent, useEffect, useState, useRef, RefObject } from 'react';
import Map, { MapRef, Marker } from 'react-map-gl';
import NextLink from 'next/link';
import { trpc } from '../common/client/trpc';
import { markers } from '../utils/constants';

interface Position {
  lat: number
  long: number
}

const MIN_ZOOM = 0.78;
const MAX_ZOOM = 22;
const MIN_MARKER_DIM = 20;
const MAX_MARKER_DIM = 200;

const DEFAULT_ZOOM = 10;

function DeviceMap() {

  function normalizeMarkerDim(zoom: number) {
    return (zoom-MIN_ZOOM)/(MAX_ZOOM-MIN_ZOOM)*(MAX_MARKER_DIM-MIN_MARKER_DIM)+MIN_MARKER_DIM;
  }
  
  const [isLg] = useMediaQuery('(min-width: 62em)');
  const [pos, setPos] = useState<Position | null>(null);
  const [searchLocation, setSearchLocation] = useState('');
  const mapRef = useRef<MapRef>() as RefObject<MapRef>;
  const [markerDim, setMarkerDim] = useState(normalizeMarkerDim(DEFAULT_ZOOM));
  
  const { refetch, isLoading } = trpc.useQuery(['position.forward', { location: searchLocation }], {
    enabled: false
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setPos({
        lat: coords.latitude,
        long: coords.longitude
      });
    });
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { data } = await refetch();
      setPos({
        lat: data!.data.lat,
        long: data!.data.long
      });
      mapRef.current?.flyTo({ center: [data!.data.long, data!.data.lat] });
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <>
      {pos ? 
        <>
          <HStack align="center" p={10} pos="fixed" top={0} w="full" zIndex={10} justify="space-between">
            <NextLink href="/" passHref>
              <Leaf cursor="pointer" size={36} strokeWidth={3} />
            </NextLink>
            <HStack align="center" gap={10}>
              {isLg && <Link>Register your Device</Link>}
              <form onSubmit={onSubmit}>
                <InputGroup w="xs">
                  <InputLeftElement>
                    {isLoading ? <Spinner size="sm" /> :<Search2Icon w={4} h={4} />}
                  </InputLeftElement>
                  <Input 
                    value={searchLocation} 
                    onChange={e => setSearchLocation(e.target.value)} 
                    rounded="full" 
                    variant="filled" 
                    focusBorderColor='purple.400' 
                    placeholder='Search location' />
                </InputGroup>
              </form>
            </HStack>   
          </HStack>
          <Map
            ref={mapRef}
            initialViewState={{
              longitude: pos?.long,
              latitude: pos?.lat,
              zoom: 10
            }}    
            style={{ width: '100vw', height: '100vh' }}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            onZoom={e => setMarkerDim(normalizeMarkerDim(e.viewState.zoom))}
          >
            {markers.map(({ lat, long }, i) => <Marker key={i} longitude={long} latitude={lat}>
              <Box borderRadius="full" h={markerDim} w={markerDim} bg="rgba(214, 188, 250, 0.5)" border="2px solid #44337A" />
            </Marker>)}
          </Map>
        </> :
        <Center height="100vh">
          <Spinner size="lg" color="purple.200" />
        </Center>}
    </>
  );
}

export default DeviceMap;