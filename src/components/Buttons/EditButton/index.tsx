import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { RiPencilLine } from 'react-icons/ri';

interface props extends ButtonProps {
    label: string
}  

export function EditButton({label, ...rest}: props) {
    return(
        <Button 
            cursor="pointer"
            as="a" 
            size="md" 
            fontSize="md" 
            colorScheme="orange" 
            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
            {...rest}
            >
            {label}
        </Button>
    )
}
export default EditButton;