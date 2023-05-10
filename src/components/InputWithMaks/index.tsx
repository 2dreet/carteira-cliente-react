import { Input as ChakraInput, FormLabel, FormControl, InputProps as ChakraInputProps, FormErrorMessage, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import InputMask from "react-input-mask";

interface InputMaksProps extends ChakraInputProps {
    name: string,
    label?: string,
    error?: FieldError,
    rightComponent?: ReactNode,
    mask: string
} 

const InputWithMaksBase: ForwardRefRenderFunction<HTMLInputElement, InputMaksProps> = ({name, label, error = null, mask, rightComponent = undefined, ...rest}, ref) => {
    return (
        <FormControl isInvalid={!!error}>
            { !!label && <FormLabel htmlFor={name} > {label} </FormLabel>}
            <InputGroup>
                
                <ChakraInput 
                as={ InputMask } 
                mask={mask}
                maskChar={null}
                name={name} 
                focusBorderColor="blue.400" 
                bgColor={"gray.200"} 
                variant="filled" 
                color="gray.900"
                _hover={{bgColor : "gray.50"}}
                _focus={{bgColor : "gray.50"}}
                size="lg" 
                
                ref={ref}
                {...rest}/>

                {rightComponent && 
                    <InputRightElement 
                        m="1"
                        border="none"
                        borderRadius="0"
                        overflow="hidden"
                        children= {
                            rightComponent
                    } />
                }
            </InputGroup>

            {!!error && 
                <FormErrorMessage>
                    {error.message}
                </FormErrorMessage>
            }
        </FormControl>
    );
}

export const InputWithMaks = forwardRef(InputWithMaksBase);