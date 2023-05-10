import { Box, Flex, Divider, HStack, Modal, ModalBody, ModalContent, ModalOverlay, SimpleGrid, VStack, Text, Avatar, Table, Thead, Tr, Th, Tbody, Td, ModalCloseButton } from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons';

import CancelButton from "../Buttons/CancelButton";
import SaveButton from "../Buttons/SaveButton";
import { SelectItemProps } from "../Select";
import { useEffect, useState } from "react";
import { UserService } from "../../services/UserService";
import { useLoading } from "../../contexts/LoadingContext";
import { useMessageContext } from "../../contexts/MessageContext";
import { AxiosError } from "axios";
import { ErrorDTO } from "../../domain/dto/ErrorDTO";
import { useUserForm } from "../../contexts/UserFormContext";
import { useConfirmDialogContext } from "../../contexts/ConfirmDialogContext";
import { UserBind } from "../../domain/models/UserBind";
import { UserBindDependent } from "../../domain/models/UserBindDependent";
import { useSearchContext } from "../../contexts/UserSearchContext";
import CreateButton from "../Buttons/CreateButton";
import UserSearch from "../UserSearch";

const userRules: SelectItemProps[] = [
    { key: "DIRECTOR", label: "Diretor"},
    { key: "MANAGER", label: "Gerente"},
    { key: "SELLER", label: "Vendedor"}
];

const userService = new UserService();

export function BindUserForm(){

    const { searchUser, openSearchUser, showSearchUserForm } = useSearchContext();

    const [userBind, setUserBind] = useState<UserBind>({} as UserBind);

    const [usesrBindToDelet, setUsesrBindToDelet] = useState<UserBindDependent[]>([]);

    const { show } = useConfirmDialogContext();

    const { hideForm, open, getUserBind } = useUserForm();

    const { showLoading, hideLoading} = useLoading();

    const { setErrorMessage } = useMessageContext();

    useEffect(() => {
        setUserBind(getUserBind());
        setUsesrBindToDelet([]);
    }, [open]);

    useEffect(() => {
        if(!openSearchUser) {
            console.log(searchUser);
        }
    }, [openSearchUser]);

    async function handleSaveUser() {
        show("Confirmar", "Deseja salvar os dados do usuário", () => {
            sendUser();
        });
    };


   async function sendUser() {
        showLoading();
        try {
            // await userService.sendUser(formData);
            // if(formData.id && formData.id != null && formData.id > 0 ){
            //     setSuccessMessage("Usuário alterado com sucesso!");
            // } else {
            //     setSuccessMessage("Usuário criado com sucesso!");
            // }
            hideForm();
        } catch (_e) {
            const error = _e as AxiosError;
            const message = error.response?.data as ErrorDTO;
            setErrorMessage("Ocorreu um erro ao enviar o usuário: " + message.message);
        }
        hideLoading();
    }

    function getRule(rule: string): string {
        if(rule === "ADMIN") {
            return "Administrador";
        } else if(rule === "DIRECTOR") {
            return "Diretor";
        } else if(rule === "MANAGER") {
            return "Gerente";
        } else if(rule === "SELLER") {
            return "Vendedor";
        }
        return "";
    }

    function deleteDependent(userDepedent: UserBindDependent) {
        userBind.dependents = userBind.dependents.filter(dependent => dependent.id != userDepedent.id);
        setUserBind(userBind);
        setUsesrBindToDelet( [...usesrBindToDelet, userDepedent]);
    }

    function handleSearchUsers() {
        showSearchUserForm();
    }

    return (
        <>
            <Modal 
                size="6xl"
                isOpen={open} 
                onClose={hideForm}
                blockScrollOnMount={false}>
                    
                <ModalOverlay />
                <ModalContent 
                    m="3" 
                    p="0" 
                    bg="none">

                    <ModalBody 
                        m="3" 
                        
                        p="0">

                        <Flex 
                            w="100%" 
                            maxW={1480}
                            mx="auto" >
                            
                            <Box 
                                flex="1" 
                                borderRadius={8} 
                                bg="gray.700" 
                                p={["6", "8"]} >

                                <Flex
                                    align="left">
                                    <Flex 
                                        align="center">
                                            
                                        <Avatar 
                                            size="md"
                                            name={userBind?.person?.name}
                                            src=""/>

                                        <Box 
                                            ml="4" 
                                            textAlign="left">

                                            <Text>{ userBind?.person?.name }</Text>
                                            <Text 
                                                color="gray.300" 
                                                fontSize="small">
                                                    {userBind?.login}
                                            </Text>
                                            <Text > 
                                                { userRules.map(rule => rule.key === userBind?.rule ? rule.label : "" )  }
                                            </Text>
                                        </Box>
                                    </Flex>  
                                    
                                    <ModalCloseButton m="4"/>
                                </Flex>

                                <Divider mt="4" />

                                <CreateButton label="Localizar usuarios" onClick={handleSearchUsers}/>    

                                <VStack 
                                    minH="70vh"
                                    spacing="4">
                                    
                                    <SimpleGrid 
                                        minChildWidth="240px" 
                                        spacing="4"
                                        w="100%">

                                            <Table colorScheme="gray" mt="4">
                                                <Thead>
                                                    <Tr>
                                                        <Th color="gray.300" fontSize="16">
                                                            Usuário
                                                        </Th>
                                                        <Th color="gray.300" fontSize="16"> Perfil </Th>
                                                        <Th w="8"></Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {!!userBind && !!userBind?.dependents && userBind?.dependents.map(user => 
                                                        <Tr key={user.id}>
                                                            <Td>
                                                                <Box>
                                                                    <Text fontWeight="bold">
                                                                        {user.dependent.person.name}
                                                                    </Text>
                                                                    <Text fontSize="md" color="gray.300">
                                                                        {user.dependent.login}
                                                                    </Text>
                                                                </Box>
                                                            </Td>
                                                            <Td> { getRule(user.dependent.rule) } </Td>
                                                            <Td> <DeleteIcon cursor="pointer" onClick={() => deleteDependent(user)} /> </Td>
                                                        </Tr>
                                                    )}
                                                </Tbody>
                                            </Table>
                                    </SimpleGrid>
                                    
                                </VStack>

                                <Flex 
                                    mt="8" 
                                    justify="right" >

                                    <HStack
                                        spacing="4">

                                        <CancelButton onClick={hideForm} />
                                        
                                        <SaveButton 
                                                onClick={handleSaveUser}/>
                                    </HStack>    
                                </Flex>
                            </Box>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <UserSearch />
        </>
    );
}

export default BindUserForm;

function userState<T>() {
    throw new Error("Function not implemented.");
}
