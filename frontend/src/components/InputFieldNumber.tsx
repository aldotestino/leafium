import { FormControl, As, FormErrorMessage, FormLabel, Icon, NumberInputField, InputGroup, InputLeftElement, NumberInputProps, NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button } from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React, { ReactNode } from 'react';

export interface InputFieldProps extends NumberInputProps {
  label: string
  errorMessage?: string
  icon?: As
  children?: ReactNode
  max: number
  min: number
  step: number
  defaultValue: number
}

function InputFieldNumber({ label, errorMessage, icon, children, max, min, step, defaultValue, ...rest }: InputFieldProps) {

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
            <Button onClick={decrement}>-</Button>
            <Input value={quantity} name="quantity" type="number" min={1} max={10} onChange={onInputChange} />
            <Button onClick={increment}>+</Button>
          </InputGroup>
          {rest.isInvalid &&<FormErrorMessage>{errorMessage}</FormErrorMessage>}
        </FormControl>}
    </Field>
  );
}

export default InputFieldNumber;