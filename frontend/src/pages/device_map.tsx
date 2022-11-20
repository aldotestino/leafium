import {  Spinner, Center, Box, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, useDisclosure, Divider, DrawerCloseButton } from '@chakra-ui/react';
import { FormEvent, useEffect, useState, useRef, RefObject } from 'react';
import Map, { MapRef, Marker } from 'react-map-gl';
import { trpc } from '../common/client/trpc';
import MapNavbar from '../components/MapNavbar';
import { DEFAULT_ZOOM, normalizeMarkerDim } from '../utils';
import { GetServerSideProps, } from 'next';
import { abi, contractAddresses } from '../common/constants';
import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import { GatewayPosition } from '../utils/types';

interface Position {
  lat: number
  long: number
}

interface DeviceMapProps {
  gateways: GatewayPosition[]
}

function DeviceMap({ gateways }: DeviceMapProps ) {
  
  const [initialPos, setInitialPos] = useState<Position | null>(null);
  const [searchLocation, setSearchLocation] = useState('');
  const mapRef = useRef<MapRef>() as RefObject<MapRef>;
  const [markerDim, setMarkerDim] = useState(normalizeMarkerDim(DEFAULT_ZOOM));
  const [selectedGatewayIndex, setSelectedGatewayIndex] = useState(-1);

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const forwardPosition = trpc.useMutation(['position.forward']);

  useEffect(() => {
    console.log(gateways);
    
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setInitialPos({
        lat: coords.latitude,
        long: coords.longitude
      });
    });
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { data } = await forwardPosition.mutateAsync({
        location: searchLocation
      });
      mapRef.current?.flyTo({ center: [data.long, data.lat], zoom: 10 });
    } catch (err: any) {
      console.log(err);
    }
  }

  if(!initialPos) {
    return  (
      <Center height="100vh">
        <Spinner size="lg" color="purple.200" />
      </Center>
    );
  }

  return (
    <>
      <MapNavbar 
        isLoading={forwardPosition.isLoading} 
        searchLocation={searchLocation} 
        setSearchLocation={setSearchLocation} 
        onSubmit={onSubmit} 
      />

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{gateways[selectedGatewayIndex]?.name}</DrawerHeader>
          <Divider />
          <DrawerBody>
            
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Map
        ref={mapRef}
        initialViewState={{
          latitude: initialPos.lat,
          longitude: initialPos.long,
          zoom: 10
        }}    
        style={{ width: '100vw', height: '100vh' }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        onZoom={e => setMarkerDim(normalizeMarkerDim(e.viewState.zoom))}
      >
        {gateways.map(({ lat, long }, i) => 
          <Marker onClick={() => {
            setSelectedGatewayIndex(i);
            if(!isOpen) {
              onOpen();
            }
          }} key={i} longitude={long} latitude={lat}>
            <Box borderRadius="full" h={markerDim} w={markerDim} bg="rgba(214, 188, 250, 0.5)" border="2px solid #44337A" />
          </Marker>
        )}
      </Map>
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
    gateways = res.map((g: any) => ({
      id: g.id,
      name: g.name,
      lat: parseFloat(g.lat),
      long: parseFloat(g.long),
      altitude: parseInt(g.altitude),
    } as GatewayPosition)
    );
  });

  return {
    props: {
      gateways
    }
  };
};