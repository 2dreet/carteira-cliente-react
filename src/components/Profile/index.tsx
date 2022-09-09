import {Avatar, Box, Flex, Text, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, HStack, Icon, Button} from '@chakra-ui/react';
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { MdLogout } from 'react-icons/md';

interface ProfileProps {
    showName: boolean
}

export function Profile({ showName }: ProfileProps) {
    
    const { user, logOut } = useAuthenticationContext();

    return (
        <Popover>
            <PopoverTrigger>
                <Flex
                    as="button"
                    align="center"
                    ml="auto">
                    <Flex 
                        align="center">
                        { showName && 
                            <Box 
                                mr="4" 
                                textAlign="right">

                                <Text>{user?.person.name}</Text>
                                <Text 
                                    color="gray.300" 
                                    fontSize="small">
                                        {user?.login}
                                </Text>
                            </Box>
                        }    
                        
                        <Avatar 
                            size="md"
                            name={user?.person.name}
                            src=""/>
                    </Flex>  
                </Flex>
            </PopoverTrigger>
            <PopoverContent borderColor="gray.900" >
                <PopoverArrow />
                <PopoverBody 
                    bg="gray.700">
                        <Button 
                            onClick={() => logOut(true)}
                            w="100%"
                            bg="unset"
                            _hover={{bg: "gray.700"}}
                            _active={{bg: "gray.700"}}>
                            <HStack w="100%">
                                <Icon 
                                    as={MdLogout} 
                                    fontSize="20" />
                                <Text 
                                    ml="4" 
                                    fontWeight="medium">
                                    Sair
                                </Text>
                            </HStack>
                        </Button>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}

export default Profile;