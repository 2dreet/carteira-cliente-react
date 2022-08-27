import { Box, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import CancelButton from "../../components/Buttons/CancelButton";
import Header from "../../components/Header";
import Input from "../../components/Input";
import SaveButton from "../../components/Buttons/SaveButton";
import Sidebar from "../../components/Sidebar";

export function CreateUser(){
    return (
        <Box>
            <Header />
            <Flex 
                w="100%" 
                my="6" 
                maxW={1480}
                mx="auto" 
                px="6">
                
                <Sidebar />
                
                <Box 
                    flex="1" 
                    borderRadius={8} 
                    bg="gray.700" 
                    p="8" >

                    <Heading 
                        size="lg" 
                        fontWeight="normal" >
                            Criar usuário
                    </Heading>

                    <Divider 
                        my="6" 
                        borderColor="gray.700"/>

                    <VStack 
                        spacing="8">
                        
                        <SimpleGrid 
                            minChildWidth="240px" 
                            spacing="8" 
                            w="100%">

                            <Input 
                                name="name" 
                                label="Nome completo" />
                            
                            <Input 
                                name="email" 
                                type="email" 
                                label="E-mail" />

                        </SimpleGrid>

                        <SimpleGrid 
                            minChildWidth="240px" 
                            spacing="8" 
                            w="100%">

                            <Input 
                                name="password" 
                                type="password"
                                label="Senha" />
                            
                            <Input 
                                name="password" 
                                type="password" 
                                label="Confirme a senha" />

                        </SimpleGrid>
                    </VStack>

                    <Flex 
                        mt="8" 
                        justify="flex-end">
                            
                        <HStack
                            spacing="4">
                            <CancelButton />
                            <SaveButton />
                        </HStack>    
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}

export default CreateUser;