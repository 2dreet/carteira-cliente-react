import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { FiSave } from 'react-icons/fi';
 

export function SaveButton({...rest}: ButtonProps) {
    return(
        <Button
            {...rest}
            cursor="pointer" 
            colorScheme="green"
            leftIcon={<Icon as={FiSave} fontSize="20" />}
            >
            Salvar
        </Button>
    )
}
export default SaveButton;