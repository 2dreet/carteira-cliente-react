import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { ImCancelCircle } from 'react-icons/im';
 

export function CancelButton({...rest}: ButtonProps) {
    return(
        <Button 
            cursor="pointer"
            colorScheme="whiteAlpha" 
            leftIcon={<Icon as={ImCancelCircle} fontSize="20" />}
            {...rest}
            >
            Cancelar
        </Button>
    )
}
export default CancelButton;