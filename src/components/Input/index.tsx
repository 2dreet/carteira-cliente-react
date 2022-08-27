import { Input as ChakraInput, FormLabel, FormControl, InputProps as ChakraInputProps } from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
    name: string,
    label?: string
} 

export function Input({name, label, ...rest}: InputProps) {
    return (
        <FormControl>
            { !!label && <FormLabel htmlFor={name} > {label} </FormLabel>}
            <ChakraInput 
              name={name} 
              focusBorderColor="blue.400" 
              bgColor={"gray.200"} 
              variant="filled" 
              color="gray.900"
              _hover={{bgColor : "gray.50"}}
              _focus={{bgColor : "gray.50"}}
              size="lg" 
              {...rest}/>
        </FormControl>
    );
}

export default Input;