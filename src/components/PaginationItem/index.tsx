import { Button } from "@chakra-ui/react";

export interface PaginationItemProps {
    label: number,
    isCurrent?: boolean
}

export function PaginationItem( { label, isCurrent = false}: PaginationItemProps) {
        if(isCurrent) {
            return (
                <Button 
                    size="sm" 
                    fontSize="xs" 
                    w="4" 
                    colorScheme="blue" 
                    disabled 
                    _disabled={{ bgColor: "blue.500", cursor: "default" }}>
                    {label}
                </Button>
            );
        }

        return (
            <Button 
                size="sm" 
                fontSize="xs" 
                w="4" 
                bgColor="gray.700"
                _hover={{
                    bg: "gray.500"
                }}>
                {label}
            </Button>
        );
}

export default PaginationItem;