import { Search2Icon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, Text, InputLeftElement, Spinner, VStack, InputGroupProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { trpc } from '../common/client/trpc';
import { SearchOption } from '../utils/types';

interface SearchLocationProps extends InputGroupProps {
  theme: 'light' | 'dark'
  onSelectItem: (value: SearchOption) => void
}

function SearchLocation({ onSelectItem, theme, ...r }: SearchLocationProps) {

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
        setSearchOptions(r.data.locations);
      }).catch((e) => {
        console.log(e.message);
        setSearchOptions([]);
      });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  
  return (
    <InputGroup {...r}
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
      <InputLeftElement pointerEvents="none">
        {forwardPosition.isLoading ? <Spinner size="sm" color={theme === 'dark' ? 'inherit': 'gray.400'} /> : <Search2Icon w={4} h={4} color={theme === 'dark' ? 'inherit': 'gray.400'} />}
      </InputLeftElement>
      <Input
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
        variant={theme === 'dark' ? 'filled' : 'outline' }
        borderColor={theme === 'dark' ? 'transparent' : 'gray.200'}
        _placeholder={{ color: theme === 'dark' ? 'whiteAlpha.400' : 'gray.400' }}
        _hover={{ borderColor: theme == 'dark' ? 'transparent' : 'gray.300', background: theme == 'dark' ? 'whiteAlpha.100' : 'transparent' }}  
        color={theme === 'dark' ? 'inherit' : 'gray.800' }
        focusBorderColor="purple.400"
        placeholder='Search location' />
      {(searchOptions.length > 0 && showOptions) && 
      <VStack 
        zIndex={10} 
        maxH="200px"
        overflowY="scroll" 
        gap={0} 
        p={2} 
        borderRadius="lg" 
        boxShadow="lg" 
        align="start" 
        w="full" 
        bg={theme === 'dark' ? 'gray.800' : 'gray.100'} 
        position="absolute" 
        top={12}
      >
        {searchOptions.map((o, i) => 
          <Box borderRadius="md" onClick={(e) => {
            e.stopPropagation();
            setSearchTerm(o.label);
            onSelectItem(o);
            setShowOptions(false);
          }} w="full" _hover={{ background: theme === 'dark' ? 'gray.700' : 'white' }} p={2} key={i} cursor="pointer">
            <Text color={theme === 'dark' ? 'inherit': 'gray.800'}>{o.label}</Text>
          </Box>)}
      </VStack>}
    </InputGroup>
  );
}

export default SearchLocation;