import { Flex, Input, Icon } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function Search() {
    return(
        <Flex
            as="label"
            flex="1"
            py="4"
            px="4"
            w="100%"
            alignSelf="center"
            color="gray.900"
            position="relative"
            bg="gray.50"
            borderRadius="8"
            >

            <Input 
                color="gray.900"
                variant="unstyled"
                mr="4"
                placeholder="Digite para localizar..."
                _hover={{bgColor : "gray.50"}}
                _focus={{bgColor : "gray.50"}}
                _placeholder={{ color: "gray.500" }}/>
            
            <Icon as={RiSearchLine} fontSize="20" />
        </Flex>
    );
}

export default Search;