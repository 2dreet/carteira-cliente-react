import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
    showName: boolean
}

export function Profile({ showName }: ProfileProps) {
 
    return(
        <Flex
            align="center"
            ml="auto">
            <Flex 
                align="center">
                { showName && 
                    <Box 
                        mr="4" 
                        textAlign="right">

                        <Text>José Augusto</Text>
                        <Text 
                            color="gray.300" 
                            fontSize="small">
                                jose.pasqualli@gmail.com
                        </Text>
                    </Box>
                }    

                <Avatar 
                    size="md"
                    name="José Augusto"
                    src=""/>
            </Flex>   
        </Flex>
    );
}

export default Profile;