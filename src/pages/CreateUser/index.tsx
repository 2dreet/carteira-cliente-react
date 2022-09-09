import { Box, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import CancelButton from "../../components/Buttons/CancelButton";
import Header from "../../components/Header";
import {Input} from "../../components/Input";
import SaveButton from "../../components/Buttons/SaveButton";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";

type CreateUserFromData = {
    name: string,
    login: string,
    email: string,
    password: string,
    rePassword: string
}

const CreateUserFromSchema = yup.object().shape({
    name: yup.string().required("Nome Obrigatório"),
    login: yup.string().required("Usuário Obrigatório").min(4, "Usuário deve ter 4 caracteres ou mais"),
    email: yup.string().required("E-mail Obrigatório").email("Deve ser um E-mail válido"),
    password: yup.string().required("Senha Obrigatória").min(6, "Senha deve ter 6 caracteres ou mais"),
    rePassword: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
});

export function CreateUser(){

    const { register, handleSubmit, formState } = useForm<CreateUserFromData>({ resolver: yupResolver(CreateUserFromSchema) });

    const handleCreateUser: SubmitHandler<CreateUserFromData> = async (formData) => {
        await new Promise(resolse => setTimeout(resolse, 2000))
        console.log(formData);
    };

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
                    as={"form"} 
                    onSubmit={handleSubmit(handleCreateUser)}
                    flex="1" 
                    borderRadius={8} 
                    bg="gray.700" 
                    p={["6", "8"]} >

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
                            spacing={["6", "8"]}
                            w="100%">

                            <Input 
                                {...register("name")}
                                error={formState.errors.name}
                                name="name" 
                                label="Nome completo" />
                            
                            <Input 
                                {...register("login")}
                                error={formState.errors.login}
                                name="login" 
                                label="Usuário" />

                            <Input 
                                {...register("email")}
                                error={formState.errors.email}
                                name="email" 
                                type="email" 
                                label="E-mail" />

                        </SimpleGrid>

                        <SimpleGrid 
                            minChildWidth="240px" 
                            spacing={["6", "8"]}
                            w="100%">

                            <Input 
                                {...register("password")}
                                error={formState.errors.password}
                                name="password" 
                                type="password"
                                label="Senha" />
                            
                            <Input 
                                {...register("rePassword")}
                                error={formState.errors.rePassword}
                                name="rePassword" 
                                type="password" 
                                label="Confirme a senha" />

                        </SimpleGrid>
                    </VStack>

                    <Flex 
                        mt="8" 
                        justify="flex-end">
                            
                        <HStack
                            spacing="4">
                            <Link to={"/users"}>
                                <CancelButton />
                            </Link>
                            
                            <SaveButton 
                                    type="submit" 
                                    isLoading={formState.isSubmitting}/>
                        </HStack>    
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}

export default CreateUser;