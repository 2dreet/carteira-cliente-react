import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { RiAddLine } from 'react-icons/ri';

interface props extends ButtonProps {
    label: string
}  

export function CreateButton({label, ...rest}: props) {
    return(
        <Button 
            cursor="pointer"
            as="a" 
            size="md" 
            fontSize="md" 
            colorScheme="green" 
            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            {...rest}
            >
            {label}
        </Button>
    )
}
export default CreateButton;