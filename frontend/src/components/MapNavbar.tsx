import { Search2Icon } from '@chakra-ui/icons';
import { HStack, Input, InputGroup, InputLeftElement, Link, Spinner, useMediaQuery } from '@chakra-ui/react';
import { Leaf } from 'lucide-react';
import NextLink from 'next/link';
import { FormEvent } from 'react';

interface MapNavbarProps {
  isLoading: boolean
  searchLocation: string
  setSearchLocation: (newLocation: string) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

function MapNavbar({ isLoading, searchLocation, setSearchLocation, onSubmit }: MapNavbarProps) {

  const [isLg] = useMediaQuery('(min-width: 62em)');

  return (          
    <HStack align="center" p={10} pos="fixed" top={0} w="full" zIndex={10} justify="space-between">
      <NextLink href="/" passHref>
        <Leaf cursor="pointer" size={36} strokeWidth={3} />
      </NextLink>
      <HStack align="center" gap={10}>
        {isLg && <NextLink href="/register_device" passHref>
          <Link>Register your Device</Link>
        </NextLink>}
        <form onSubmit={onSubmit}>
          <InputGroup w="xs">
            <InputLeftElement>
              {isLoading ? <Spinner size="sm" /> :<Search2Icon w={4} h={4} />}
            </InputLeftElement>
            <Input 
              value={searchLocation} 
              onChange={e => setSearchLocation(e.target.value)} 
              variant="filled" 
              focusBorderColor='purple.400' 
              placeholder='Search location' />
          </InputGroup>
        </form>
      </HStack>   
    </HStack>);
}

export default MapNavbar;