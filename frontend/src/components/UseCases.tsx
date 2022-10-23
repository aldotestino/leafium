import { VStack, Heading, SimpleGrid, Image, Tag, Box, HStack, Text } from '@chakra-ui/react';
import { UseCase, useCases } from '../utils/constants';

function UseCases() {
  return (
    <VStack id='uc' pt={20} gap={10} px={[5, 5, 10, 32]} bg="gray.100">
      <Heading color="gray.800">Use cases</Heading>
      <SimpleGrid w="full" gap={20} columns={[1, 1, 1, 2, 3]}>
        {useCases.map((u, i) => <UseCaseCard key={i} {...u} />)}
      </SimpleGrid>
    </VStack>
  );
}

function UseCaseCard({ image, title, body, tag, tagColor }: UseCase) {
  return (
    <VStack justifySelf="center" borderRadius="lg" bg="gray.900" maxW="sm" h="md" boxShadow="dark-lg">
      <Image borderTopLeftRadius="lg" borderTopRightRadius="lg" h="200px" w="full" src={image} />
      <Box px={5}>
        <HStack py={6} w="full" justify="end">
          <Tag size="lg" bg="gray.600" color={tagColor}>{tag}</Tag>
        </HStack>
        <Heading size="md">{title}</Heading>
        <Text>{body}</Text>
      </Box>
    </VStack>
  );
}

export default UseCases;