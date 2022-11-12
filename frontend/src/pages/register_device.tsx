import { AddIcon } from '@chakra-ui/icons';
import { Box, Image, Center, Heading, VStack, Button, useMediaQuery, useToast, Flex } from '@chakra-ui/react';
import { Form, Formik, FormikProps } from 'formik';
import { Leaf } from 'lucide-react';
import NextLink from 'next/link';
import { Ref, useEffect, useRef } from 'react';
import InputField from '../components/InputField';
import { generateRandomName } from '../utils';
import * as z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { trpc } from '../common/client/trpc';

const gatewaySchema = z.object({
  gatewayId: z.string().length(20).startsWith('eui-').regex(new RegExp('[a-zA-Z0-9]+$'), 'String must not contain special characrers'),
  gatewayName: z.string(),
  lat: z.string().regex(new RegExp('^-?([0-8]?[0-9]|90)(\\.[0-9]{1,10})?$')),
  long: z.string().regex(new RegExp('^-?([0-9]{1,2}|1[0-7][0-9]|180)(\\.[0-9]{1,10})?$')),
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

  const toast = useToast();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      formRef.current?.setFieldValue('lat', coords.latitude.toString());
      formRef.current?.setFieldValue('long', coords.longitude.toString());
    });
  }, []);

  async function onSubmit(values: GatewaySchema) {
    try {
      await checkGateway.mutateAsync({ gatewayId: values.gatewayId });
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
      <Center m={0} py={10} minH="100vh" bg="gray.100" flex={1}>
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
                <VStack w="sm" gap={4} p={10} background="white" borderRadius="lg" boxShadow="lg">
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
                  <Button leftIcon={<AddIcon />} alignSelf="end" type="submit" colorScheme="purple">
                    Register
                  </Button>
                </VStack>
              </Form>
            }
          </Formik>
        </VStack>
      </Center>
    </Flex>
  );
}

export default RegisterDevice;