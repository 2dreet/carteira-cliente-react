import { Flex, VStack, Spinner, Text } from "@chakra-ui/react";

export function LoadingScreen () {
    return (
        <Flex 
            w={'100vw'} 
            h={'100vh'} 
            align="center" 
            justify={"center"}
            direction="column"
            >
            <VStack>
                <Spinner 
                    thickness='4px'
                    speed='0.95s'
                    size='xl'/>
                <Text
                    fontSize="xl">
                    carregando...
                </Text>
            </VStack>
        </Flex>
    );
}

export default LoadingScreen;