import { Flex, HStack, Link, useMediaQuery } from '@chakra-ui/react';
import { Leaf } from 'lucide-react';
import NextLink from 'next/link';
import { SearchOption } from '../utils/types';
import SearchLocation from './SearchLocation';

interface MapNavbarProps {
  setMapLocation: (lat: number, long: number) => void
}

function MapNavbar({ setMapLocation }: MapNavbarProps) {

  const [isLg] = useMediaQuery('(min-width: 62em)');

  return (          
    <Flex align="center" p={10} pos="fixed" top={0} w="full" zIndex={10} justify="space-between">
      <NextLink href="/" passHref>
        <Leaf cursor="pointer" size={36} strokeWidth={3} />
      </NextLink>
      <HStack gap={10} align="center">
        {isLg && 
          <NextLink href="/register_device" passHref>
            <Link>Register your Device</Link>
          </NextLink>
        }
        <SearchLocation theme="dark" w="xs" onSelectItem={(o: SearchOption) => setMapLocation(o.lat, o.long)} />
      </HStack>   
    </Flex>);
}

export default MapNavbar;