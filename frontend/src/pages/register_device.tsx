import { AddIcon, Search2Icon } from '@chakra-ui/icons';
import { Box, Image, Center, Text, Heading, VStack, Button, useMediaQuery, useToast, Flex, useDisclosure, InputLeftElement, Spinner, Input, InputGroup, FormControl, FormLabel, Divider } from '@chakra-ui/react';
import { Form, Formik, FormikProps } from 'formik';
import { Leaf } from 'lucide-react';
import NextLink from 'next/link';
import { Ref, useEffect, useRef, useState } from 'react';
import InputField from '../components/InputField';
import { generateRandomName, isTx } from '../utils';
import * as z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { trpc } from '../common/client/trpc';
import { abi, contractAddresses } from '../common/constants';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import ConfirmationModal from '../components/ConfirmationModal';
import { useSteps } from 'chakra-ui-steps';
import CheckConnectionModal from '../components/CheckConnectionModal';
import { SearchOption } from '../utils/types';
import SearchLocation from '../components/SearchLocation';

const gatewaySchema = z.object({
  gatewayId: z.string().length(20).startsWith('eui-').regex(new RegExp('[a-zA-Z0-9]+$'), 'String must not contain special characrers'),
  gatewayName: z.string(),
  lat: z.string().regex(new RegExp('^-?([0-8]?[0-9]|90)(\\.[0-9]{1,14})?$')),
  long: z.string().regex(new RegExp('^-?([0-9]{1,2}|1[0-7][0-9]|180)(\\.[0-9]{1,15})?$')),
  altitude: z.number().min(0).max(5000)
});

type GatewaySchema = z.infer<typeof gatewaySchema>;

const initialValues: GatewaySchema = {
  gatewayId: '',
  gatewayName: generateRandomName(),
  lat: '',
  long: '',
  altitude: 0
};

function RegisterDevice() {

  const [isLg] = useMediaQuery('(min-width: 62em)');
  const formRef = useRef<FormikProps<GatewaySchema>>();
  const checkGateway = trpc.useMutation(['device.check']);

  // START AUTOCOMPLETE CONTROLS
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
  // END AUTOCOMPLETE CONTROLS

  const toast = useToast();

  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex || '0x0').toString() as keyof typeof contractAddresses;
  const leafiumContractAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const { runContractFunction: addGateway, isLoading, isFetching } = useWeb3Contract({
    abi,
    contractAddress: leafiumContractAddress!,
    functionName: 'addGateway',
    params: {}
  });

  const { nextStep, activeStep, reset } = useSteps({
    initialStep: 0,
  });

  const [transactionHash, setTransactionHash] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      formRef.current?.setFieldValue('lat', coords.latitude.toString());
      formRef.current?.setFieldValue('long', coords.longitude.toString());
    });
  }, []);

  function setLocationFromSearch({ lat, long }: SearchOption) {
    formRef.current?.setFieldValue('lat', lat.toString());
    formRef.current?.setFieldValue('long', long.toString());
  }

  async function onSubmit(values: GatewaySchema) {
    try {
      await checkGateway.mutateAsync({ gatewayId: values.gatewayId });
      onOpen();
      await addGateway({
        onError: () => {
          onClose();
          reset();
        },
        onSuccess: async (tx) => {
          nextStep();
          if(isTx(tx)) {
            setTransactionHash(tx.hash);
            await tx.wait(1);
            await new Promise(res => setTimeout(res, 10000));
            nextStep();
          }
        },
        params: {
          params: values
        }
      });
      console.log('gateway aggiunto');
    }catch(e: any) {
      console.log(e.message);
      toast({
        title: 'Gateway doesn\'t exist',
        description: e.message,
        duration: 5000,
        isClosable: true,
        status: 'error',
        position: 'top-right'
      });
    }
  }

  return (
    <>
      <Flex align="start">
        {isLg && <Box flex={1}  minH="100vh">
          <Box p={10}>
            <NextLink href="/" passHref>
              <Leaf cursor="pointer" size={36} strokeWidth={3} />
            </NextLink>
          </Box>
          <Center>
            <Image src='./illustration2.svg' />
          </Center>
        </Box>}
        <Box minH="100vh" bg="gray.100" flex={1}>
          {!isLg && <Box p={10}>
            <NextLink href="/" passHref>
              <Leaf cursor="pointer" color='#1A202C' size={36} strokeWidth={3} />
            </NextLink>
          </Box>}
          <Center h={isLg ? '100vh' : 'full'} m={0} pt={!isLg ? 0 : 10} pb={10}>
            <VStack gap={10}>
              <Heading color="gray.800">Register your device</Heading>
              <Formik
                innerRef={formRef as Ref<FormikProps<GatewaySchema>>}
                initialValues={initialValues}
                validateOnBlur={false}
                validationSchema={toFormikValidationSchema(gatewaySchema)}
                onSubmit={onSubmit}
              >
                {({ errors, touched }) =>
                  <Form>
                    <VStack w="sm" gap={2} p={10} background="white" borderRadius="lg" boxShadow="lg">
                      <InputField
                        name="gatewayId"
                        errorMessage={errors.gatewayId}
                        label="Gateway ID"
                        placeholder="eui-1838193812938"
                        type="text"
                        isInvalid={Boolean(errors.gatewayId && touched.gatewayId)}
                      />
                      <InputField
                        name="gatewayName"
                        isDisabled={true}
                        errorMessage={errors.gatewayName}
                        label="Gateway Name"
                        type="text"
                        isInvalid={Boolean(errors.gatewayName && touched.gatewayName)}
                      />
                      <FormControl>
                        <FormLabel color="gray.800">Search location</FormLabel>
                        <SearchLocation theme='light' onSelectItem={setLocationFromSearch} />
                      </FormControl>
                      <Box textAlign="center" w="full" transform="translateY(50%)">
                        <Divider borderColor="gray.200" />
                        <Text transform="translateY(-60%)" px={2} background="white" mx="auto" w="fit-content" color="gray.500">or add manually</Text>
                      </Box>
                      <InputField
                        name="lat"
                        errorMessage={errors.lat}
                        placeholder="Loading..."
                        label="Latitude"
                        type="text"
                        isInvalid={Boolean(errors.lat && touched.lat)}
                      />
                      <InputField
                        name="long"
                        errorMessage={errors.long}
                        placeholder="Loading..."
                        label="Longitude"
                        type="text"
                        isInvalid={Boolean(errors.long && touched.long)}
                      />
                      <InputField
                        name="altitude"
                        errorMessage={errors.altitude}
                        label="Altitude"
                        type="number"
                        min={0}
                        isInvalid={Boolean(errors.altitude && touched.altitude)}
                      />
                      <Button isLoading={isLoading || isFetching} leftIcon={<AddIcon />} alignSelf="end" type="submit" colorScheme="purple">
                        Register
                      </Button>
                    </VStack>
                  </Form>
                }
              </Formik>
            </VStack>
          </Center>
        </Box>
      </Flex>

      <ConfirmationModal activeStep={activeStep} resetSteps={reset} transactionHash={transactionHash} isOpen={isOpen} onClose={onClose} />
      <CheckConnectionModal isOpen={!isWeb3Enabled} />
    </>
  );
}

export default RegisterDevice;