import { Flex, Input, Icon, Button } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

interface SearchProps {
    setValue(value:string): void,
    handlerSearch(): void
}

export function Search({setValue, handlerSearch}: SearchProps) {

    function searchOnEnter(event: any) {
        if(event.key === "Enter"){
            handlerSearch();
        }
    }


    return(
        <Flex
            as="label"
            flex="1"
            py="2"
            px="2"
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
                ml="2"
                placeholder="Digite para localizar..."
                _hover={{bgColor : "gray.50"}}
                _focus={{bgColor : "gray.50"}}
                _placeholder={{ color: "gray.500" }}
                onChange={(e) => setValue(e.target.value)}
                onKeyUp={searchOnEnter}/>
            
            <Button 
                p="0"
                m="0"
                bg="none"
                _hover={{bg:"none"}}
                onClick={handlerSearch}>
                <Icon as={RiSearchLine} fontSize="20" />
            </Button>
        </Flex>
    );
}

export default Search;