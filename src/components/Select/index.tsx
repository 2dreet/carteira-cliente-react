import { Select as ChakraSelect, FormLabel, FormControl, SelectProps as ChakraSelectProps } from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';

export interface SelectItemProps {
    key: string,
    label: string
}

interface SelectProps extends ChakraSelectProps {
    name: string,
    label?: string,
    itens: SelectItemProps[]
} 

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = ({name, label, itens = [], ...rest}, ref) => {
    return (
        <FormControl>
            { !!label && <FormLabel htmlFor={name} > {label} </FormLabel>}
            <ChakraSelect 
              name={name} 
              focusBorderColor="blue.400" 
              bgColor={"gray.200"} 
              variant="filled" 
              color="gray.900"
              _hover={{bgColor : "gray.50"}}
              _focus={{bgColor : "gray.50"}}
              size="lg" 
              ref={ref}
              {...rest}>

                {itens && itens.map( item => <option key={item.key} value={item.key}> {item.label} </option> )}

              </ChakraSelect>
        </FormControl>
    );
}

export const Select = forwardRef(SelectBase);