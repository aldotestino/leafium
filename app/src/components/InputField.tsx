import { FormControl, As, FormErrorMessage, FormLabel, Icon, Input, InputGroup, InputLeftElement, InputProps } from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React, { ReactNode } from 'react';

export interface InputFieldProps extends InputProps {
  label: string
  errorMessage?: string
  icon?: As
  children?: ReactNode
}

function InputField({ label, errorMessage, icon, children, ...rest }: InputFieldProps) {

  return (
    <Field name={rest.name}>
      {({ field }: FieldProps) =>
        <FormControl isInvalid={rest.isInvalid}>
          <FormLabel color="gray.800">{label}</FormLabel>
          <InputGroup>
            {icon &&
                <InputLeftElement pointerEvents="none">
                  <Icon as={icon} w="4" h="4" />
                </InputLeftElement>
            }
            <Input borderColor="gray.200" _placeholder={{ color: 'gray.400' }} _hover={{ borderColor: 'gray.300' }} color="gray.800" focusBorderColor="purple.400" {...field} {...rest} />
            {children}
          </InputGroup>
          {rest.isInvalid &&<FormErrorMessage>{errorMessage}</FormErrorMessage>}
        </FormControl>}
    </Field>
  );
}

export default InputField;