import { HStack, Input, Link, InputGroup, InputLeftElement, Spinner, Center, useMediaQuery, Box } from '@chakra-ui/react';
import { Leaf } from 'lucide-react';
import { Search2Icon } from '@chakra-ui/icons';
import { FormEvent, useEffect, useState, useRef, RefObject } from 'react';
import Map, { MapRef, Marker } from 'react-map-gl';
import NextLink from 'next/link';
import { trpc } from '../common/client/trpc';
import { markers } from '../utils/data';
import MapNavbar from '../components/MapNavbar';
import { DEFAULT_ZOOM, normalizeMarkerDim } from '../utils';

interface Position {
  lat: number
  long: number
}


function DeviceMap() {
  
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
          <MapNavbar 
            isLoading={isLoading} 
            searchLocation={searchLocation} 
            setSearchLocation={setSearchLocation} 
            onSubmit={onSubmit} 
          />
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