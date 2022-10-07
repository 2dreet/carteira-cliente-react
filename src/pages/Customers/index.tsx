import { Box, Checkbox, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateButton from "../../components/Buttons/CreateButton";
import EditButton from "../../components/Buttons/EditButton";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import Sidebar from "../../components/Sidebar";
import UserForm from "../../components/UserForm";
import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import { useLoading } from "../../contexts/LoadingContext";
import { useMessageContext } from "../../contexts/MessageContext";
import { useUserForm } from "../../contexts/UserFormContext";
import { SearchUser } from "../../domain/dto/SearchUser";

import { User } from "../../domain/models/User";
import { UserService } from "../../services/UserService";

const service = new UserService();

export function Customers(){

    const navigate = useNavigate();

    const { user } = useAuthenticationContext();

    const { setUser, showForm, open } = useUserForm();

    const { showLoading, hideLoading} = useLoading();

    const { setErrorMessage } = useMessageContext();

    const [searchValue, setSearchValue ] = useState("");

    const [searchUser, setSearchUser] = useState<SearchUser>({} as SearchUser);

    const [page, setPage] = useState<number>(1);

    const isMobile = useBreakpointValue({
        base: true,
        md: false
    });

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

    async function searchUsers(page: number) {
        showLoading();
        try {
            setSearchUser(await service.searchUser(searchValue, page));
        } catch(_e) {
            setErrorMessage("Ocorreu um erro ao listar os usuário, tente novamente mais tarde.");
        }
        hideLoading();
    }

    useEffect(() => {
        if(!user?.rule || user?.rule !== "ADMIN") {
            navigate("/");
        }
        
        handleSearchUser();
    }, []);

    function handleCreateUser() {
        setUser(undefined);
        showForm();
    }

    async function handleUpdateUser(userSelected: User) {
        const user = await service.getUserById(userSelected.id);
        setUser(user);
        showForm();
    }

    useEffect(() => {
        if(!open) {
            handleSearchUser();
        }
    }, [open]);

    function setPageUserTable(page: number) {
        setPage(page);
        searchUsers(page);
    }
    
    function handleSearchUser() {
        setPage(1);
        searchUsers(1);
    }

    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                <Sidebar />
                
                <Box flex="1" borderRadius={8} bg="gray.700" p="8" >
                    <Flex mb="8" justify="space-between" align="center" >
                        <Heading size="lg" fontWeight="normal" >
                            Clientes
                        </Heading>
                        
                        <CreateButton label="Criar novo" onClick={handleCreateUser}/>
                        
                    </Flex>

                    <Search setValue={setSearchValue} handlerSearch={handleSearchUser}/>

                    <Table colorScheme="gray" mt="4">
                        <Thead>
                            <Tr>
                                <Th color="gray.300" fontSize="16">
                                    Usuário
                                </Th>
                                {!isMobile && <Th color="gray.300" fontSize="16"> Perfil </Th>}
                                <Th w="8"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {!!searchUser && !!searchUser.users && searchUser.users.map(user => 
                                <Tr key={user.login}>
                                    <Td>
                                        <Box>
                                            <Text fontWeight="bold">
                                                {user.person.name}
                                            </Text>
                                            <Text fontSize="md" color="gray.300">
                                                {user.login}
                                            </Text>
                                        </Box>
                                    </Td>
                                    {!isMobile && <Td> { getRule(user.rule)} </Td>}
                                    <Td> <EditButton label="Editar" onClick={() => handleUpdateUser(user)}/> </Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                    <Pagination currentPage={page} pages={searchUser.totalPage } setPage={setPageUserTable}/>
                </Box>
            </Flex>
            
            <UserForm />
        </Box>
    );
}

export default Customers;