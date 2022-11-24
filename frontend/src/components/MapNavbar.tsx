import { Search2Icon } from '@chakra-ui/icons';
import { Box, Flex, Text, HStack, Input, InputGroup, InputLeftElement, Link, Spinner, useMediaQuery, VStack, Divider } from '@chakra-ui/react';
import { Leaf } from 'lucide-react';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { trpc } from '../common/client/trpc';

interface MapNavbarProps {
  setMapLocation: (lat: number, long: number) => void
}

interface SearchOption  {
  lat: number
  long: number
  label: string
}

function MapNavbar({ setMapLocation }: MapNavbarProps) {

  const [isLg] = useMediaQuery('(min-width: 62em)');

  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [searchOptions, setSearchOptions] = useState<SearchOption[]>([]);
  const forwardPosition = trpc.useMutation(['position.forward']);

  useEffect(() => {
    if(searchTerm === '') {
      setSearchOptions([]);
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm);
      forwardPosition.mutateAsync({ searchTerm }).then(r => {
        console.log(r);
        setSearchOptions(r.data.locations);
      }).catch((e) => {
        console.log(e.message);
        setSearchOptions([]);
      });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

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
        <InputGroup w="xs"
          onFocus={() => setShowOptions(true)}
          tabIndex={100}
          onBlur={(e) => {
            const currentTarget = e.currentTarget;
            requestAnimationFrame(() => {
              if (!currentTarget.contains(document.activeElement)) {
                setShowOptions(false);
              }
            });
          }}
        >
          <InputLeftElement>
            {forwardPosition.isLoading ? <Spinner size="sm" /> : <Search2Icon w={4} h={4} />}
          </InputLeftElement>
          <Input
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            variant="filled" 
            focusBorderColor='purple.400' 
            placeholder='Search location' />
          {(searchOptions.length && showOptions) > 0 && <VStack maxH="200px" overflowY="scroll" gap={0} p={2} borderRadius="lg" boxShadow="lg" align="start" w="full" bg="gray.800" position="absolute" top={12}>
            {searchOptions.map((o, i) => 
              <Box borderRadius="md" onClick={(e) => {
                e.stopPropagation();
                setMapLocation(o.lat, o.long);
                setShowOptions(false);
              }} w="full" _hover={{ background: 'gray.700' }} p={2} key={i} cursor="pointer">
                <Text>{o.label}</Text>
              </Box>)}
          </VStack>}
        </InputGroup>
      </HStack>   
    </Flex>);
}

export default MapNavbar;