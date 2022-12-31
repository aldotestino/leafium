import { Box, Center, Spinner, useDisclosure } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { RefObject, useEffect, useRef, useState } from 'react';
import Map, { MapRef, Marker } from 'react-map-gl';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { abi, contractAddresses } from '../common/constants';
import DeviceSidebar from '../components/DeviceSidebar';
import MapNavbar from '../components/MapNavbar';
import { DEFAULT_ZOOM, isOffline, normalizeMarkerDim } from '../utils';
import { Gateway } from '../utils/types';

interface Position {
  lat: number
  long: number
}

interface DeviceMapProps {
  gateways: Gateway[]
}

function DeviceMap({ gateways }: DeviceMapProps ) {
  
  const [initialPos, setInitialPos] = useState<Position | null>(null);
  const mapRef = useRef<MapRef>() as RefObject<MapRef>;
  const [markerDim, setMarkerDim] = useState(normalizeMarkerDim(DEFAULT_ZOOM));
  const [selectedGatewayIndex, setSelectedGatewayIndex] = useState(-1);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setInitialPos({
        lat: coords.latitude,
        long: coords.longitude
      });
    });
  }, []);

  function setMapLocation(lat: number, long: number) {
    mapRef.current?.flyTo({ center: [long, lat], zoom: 10 });
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
      <MapNavbar setMapLocation={setMapLocation} />
      
      <DeviceSidebar isOpen={isOpen} onClose={onClose} gateway={gateways[selectedGatewayIndex]}/>

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

  console.log(process.env.NODE_ENV);

  const chainId = process.env.NODE_ENV == 'production' ? '5': '31337';
  const contractAddress = contractAddresses[chainId as keyof typeof contractAddresses][0];


  const web3 = new Web3(process.env.NODE_ENV == 'production' ? process.env.GOERLI_RPC_URL! :'http://localhost:8545');

  const leafiumContract = new web3.eth.Contract(abi as AbiItem[], contractAddress);

  let gateways: Gateway[] = [];

  await leafiumContract.methods.getGateways().call(function (err: any, res: any) {
    gateways = res?.map((g: any) => ({
      id: g.id,
      name: g.name,
      lat: parseFloat(g.lat),
      long: parseFloat(g.long),
      altitude: parseInt(g.altitude),
      updatedAt: parseInt(g.updatedAt),
      earnings: parseInt(g.earnings),
      isOffline: isOffline(g.updatedAt)
    } as Gateway)
    );
  });

  return {
    props: {
      gateways
    }
  };
};