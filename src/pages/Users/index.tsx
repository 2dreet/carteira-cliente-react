import { Box, Checkbox, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateButton from "../../components/Buttons/CreateButton";
import EditButton from "../../components/Buttons/EditButton";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import Sidebar from "../../components/Sidebar";
import { User } from "../../domain/model/User";
import { UserService } from "../../services/UserService";


export function Users(){
    const service = new UserService();

    const [users, setUsers] = useState<User[]>();

    const isMobile = useBreakpointValue({
        base: true,
        md: false
    });

    async function getUsers() {
        setUsers(await service.getUsers());
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                <Sidebar />
                
                <Box flex="1" borderRadius={8} bg="gray.700" p="8" >
                    <Flex mb="8" justify="space-between" align="center" >
                        <Heading size="lg" fontWeight="normal" >
                            Usuários
                        </Heading>
                        <Link to="/users/create">
                            <CreateButton label="Criar novo"/>
                        </Link> 
                    </Flex>

                    <Search />

                    <Table colorScheme="gray" mt="4">
                        <Thead>
                            <Tr>
                                <Th px="6" color="gray.300" w="8" >
                                    <Checkbox colorScheme="blue" />
                                </Th>
                                <Th color="gray.300" fontSize="16">
                                    Usuário
                                </Th>
                                {!isMobile && <Th color="gray.300" fontSize="16"> Perfil </Th>}
                                {!isMobile && <Th w="8"></Th>}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {!!users && users.map(user => 
                                <Tr key={user.login}>
                                    <Td px="6">
                                        <Checkbox colorScheme="blue" />
                                    </Td>
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
                                    {!isMobile && <Td> {user.rule} </Td>}
                                    {!isMobile && <Td> <EditButton label="Editar" /> </Td>}
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                    <Pagination />
                </Box>
            </Flex>
        </Box>
    );
}

export default Users;