import {  Spinner, Center, Box } from '@chakra-ui/react';
import { FormEvent, useEffect, useState, useRef, RefObject } from 'react';
import Map, { MapRef, Marker } from 'react-map-gl';
import { trpc } from '../common/client/trpc';
import MapNavbar from '../components/MapNavbar';
import { DEFAULT_ZOOM, normalizeMarkerDim } from '../utils';
import { GetServerSideProps, } from 'next';
import { abi, contractAddresses } from '../common/constants';
import { AbiItem } from 'web3-utils';
import Web3 from 'web3';

interface Position {
  lat: number
  long: number
}

interface GatewayPosition {
  id: string
  name: string
  lat: number
  long: number
  altitude: number
}

interface DeviceMapProps {
  gateways: GatewayPosition[]
}

function DeviceMap({ gateways }: DeviceMapProps ) {
  
  const [pos, setPos] = useState<Position | null>(null);
  const [searchLocation, setSearchLocation] = useState('');
  const mapRef = useRef<MapRef>() as RefObject<MapRef>;
  const [markerDim, setMarkerDim] = useState(normalizeMarkerDim(DEFAULT_ZOOM));
  
  const { refetch, isLoading } = trpc.useQuery(['position.forward', { location: searchLocation }], {
    enabled: false
  });

  useEffect(() => {
    console.log(gateways);
    
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
            {gateways.map(({ lat, long }, i) => <Marker key={i} longitude={long} latitude={lat}>
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

export const getServerSideProps: GetServerSideProps = async () => {

  const chainId = process.env.NODE_ENV == 'production' ? '5': '31337';
  const contractAddress = contractAddresses[chainId as keyof typeof contractAddresses][0];


  const web3 = new Web3('http://localhost:8545');

  const leafiumContract = new web3.eth.Contract(abi as AbiItem[], contractAddress);

  let gateways: GatewayPosition[] = [];

  await leafiumContract.methods.getGateways().call(function (err: any, res: any) {
    gateways = res.map((g: any) => {
      return {
        id: g.id,
        name: g.name,
        lat: parseFloat(g.lat),
        long: parseFloat(g.long),
        altitude: parseInt(g.altitude)
      } as GatewayPosition;
    });
  });
  
  console.log(gateways);

  return {
    props: {
      gateways
    }
  };
};