import { AddIcon } from '@chakra-ui/icons';
import { Box, Image, Center, HStack, Heading, VStack, Button } from '@chakra-ui/react';
import { Form, Formik, useFormikContext } from 'formik';
import { Leaf } from 'lucide-react';
import NextLink from 'next/link';
import { useEffect } from 'react';
import InputFieeld from '../components/InputField';
import { generateRandomName } from '../utils';

const initialValues = {
  deviceId: '',
  deviceName: generateRandomName(),
  lat: '',
  long: '',
  altitude: 0
};

function RegisterDevice() {

  //const { setFieldValue } = useFormikContext();

  // const formik = useFormik({
  //   initialValues: {
  //     deviceId: '',
  //     deviceName: generateRandomName(),
  //     lat: '',
  //     long: '',
  //     altitude: 0
  //   },
  //   onSubmit: values => {
  //     console.log(values);
  //   },
  // });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      // setFieldValue('lat', coords.latitude.toString());
      // setFieldValue('long', coords.longitude.toString());
    });
  }, []);

  function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <HStack h="100vh">
      <Box h="full" flex={1}>
        <HStack p={10}>
          <NextLink href="/" passHref>
            <Leaf cursor="pointer" size={36} strokeWidth={3} />
          </NextLink>
        </HStack>
        <Center>
          <Image zIndex={-2} src='./illustration2.svg' />
        </Center>
      </Box>
      <Box h="full" flex={1} bg="gray.100">
        <Center h="full">
          <VStack gap={10}>
            <Heading color="gray.800">Register your device</Heading>
            <Formik
              initialValues={initialValues}
              validateOnBlur={false}
              //validationSchema={LoginSchema}
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
                      label="Latitude"
                      type="text"
                      isInvalid={Boolean(errors.lat && touched.lat)}
                    />
                    <InputField
                      name="long"
                      errorMessage={errors.long}
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
      </Box>
    </HStack>
  );
}

export default RegisterDevice;