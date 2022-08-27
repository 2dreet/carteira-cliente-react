import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { RiPencilLine } from 'react-icons/ri';
import CreateButton from "../../components/Buttons/CreateButton";
import EditButton from "../../components/Buttons/EditButton";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import Sidebar from "../../components/Sidebar";

export function User(){
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
                        <CreateButton label="Criar novo"/>
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
                                <Th color="gray.300" fontSize="16">
                                    Perfil
                                </Th>
                                <Th w="8"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td px="6">
                                    <Checkbox colorScheme="blue" />
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">
                                            José Augusto
                                        </Text>
                                        <Text fontSize="md" color="gray.300">
                                            14253
                                        </Text>
                                    </Box>
                                </Td>
                                <Td>
                                    Vendedor
                                </Td>
                                <Td>
                                    <EditButton label="Editar" />
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                    <Pagination />
                </Box>
            </Flex>
        </Box>
    );
}

export default User;