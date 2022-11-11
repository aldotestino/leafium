import { AddIcon } from '@chakra-ui/icons';
import { Box, Image, Center, HStack, Heading, VStack, Button, useMediaQuery } from '@chakra-ui/react';
import { Form, Formik, FormikProps } from 'formik';
import { Leaf } from 'lucide-react';
import NextLink from 'next/link';
import { Ref, useEffect, useRef } from 'react';
import InputField from '../components/InputField';
import { generateRandomName } from '../utils';

type Values = {
  deviceId: string;
  deviceName: string;
  lat: string;
  long: string;
  altitude: number;
}

const initialValues = {
  deviceId: '',
  deviceName: generateRandomName(),
  lat: '',
  long: '',
  altitude: 0
};

function RegisterDevice() {

  const [isLg] = useMediaQuery('(min-width: 62em)');
  const formRef = useRef<FormikProps<Values>>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      formRef.current?.setFieldValue('lat', coords.latitude.toString());
      formRef.current?.setFieldValue('long', coords.longitude.toString());
    });
  }, []);

  function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <HStack minH="100vh" align="start">
      {isLg && <Box flex={1}  minH="100vh">
        <HStack p={10}>
          <NextLink href="/" passHref>
            <Leaf cursor="pointer" size={36} strokeWidth={3} />
          </NextLink>
        </HStack>
        <Center>
          <Image src='./illustration2.svg' />
        </Center>
      </Box>}
      <Center py={10} minH="100vh" bg="gray.100" flex={1}>
        <VStack gap={10}>
          <Heading color="gray.800">Register your device</Heading>
          <Formik
            innerRef={formRef as Ref<FormikProps<Values>>}
            initialValues={initialValues}
            validateOnBlur={false}
            //validationSchema={AddGatewaySchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) =>
              <Form>
                <VStack w="sm" gap={4} p={10} background="white" borderRadius="lg" boxShadow="lg">
                  <InputField
                    name="deviceId"
                    errorMessage={errors.deviceId}
                    label="Device ID"
                    placeholder="eui-1838193812938"
                    type="text"
                    isInvalid={Boolean(errors.deviceId && touched.deviceId)}
                  />
                  <InputField
                    name="deviceName"
                    isDisabled={true}
                    errorMessage={errors.deviceName}
                    label="Device Name"
                    type="text"
                    isInvalid={Boolean(errors.deviceName && touched.deviceName)}
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
    </HStack>
  );
}

export default RegisterDevice;