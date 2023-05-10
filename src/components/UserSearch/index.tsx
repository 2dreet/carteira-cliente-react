import { Box, Flex, Heading, Modal, ModalBody, ModalContent, ModalOverlay, Table, Tbody, Td, Th, Thead, Tr, Text, Checkbox, Button, Icon } from "@chakra-ui/react";
import { SelectItemProps } from "../Select";
import { useEffect, useState } from "react";
import { UserService } from "../../services/UserService";
import { useLoading } from "../../contexts/LoadingContext";
import { useMessageContext } from "../../contexts/MessageContext";
import Pagination from "../Pagination";
import { SearchUser } from "../../domain/dto/SearchUser";
import { useSearchContext } from "../../contexts/UserSearchContext";
import Search from "../Search";
import { User } from "../../domain/models/User";
import CancelButton from "../Buttons/CancelButton";
import { FiCheck } from "react-icons/fi";

const userRules: SelectItemProps[] = [
    { key: "DIRECTOR", label: "Diretor"},
    { key: "MANAGER", label: "Gerente"},
    { key: "SELLER", label: "Vendedor"}
];

const service = new UserService();

const userService = new UserService();

export function UserSearch(){


    const { openSearchUser, hideSearchUserForm, setSearchUsers, searchUser } = useSearchContext();

    const { showLoading, hideLoading} = useLoading();

    const { setErrorMessage } = useMessageContext();

    const [searchValue, setSearchValue ] = useState("");

    const [searchedUser, setSearchedUser] = useState<SearchUser>({} as SearchUser);

    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        if(openSearchUser) {
            setSearchUsers([]);
        }
    }, [openSearchUser]);

    function handleCancelSearch() {
        setSearchUsers([]);
        hideSearchUserForm();
    }

    function handleSearchUser() {
        setPage(1);
        searchUsers(1);
    }

    async function searchUsers(page: number) {
        showLoading();
        try {
            setSearchedUser(await service.searchUser(searchValue, page));
        } catch(_e) {
            setErrorMessage("Ocorreu um erro ao listar os usuário, tente novamente mais tarde.");
        }
        hideLoading();
    }

    function setPageUserTable(page: number) {
        setPage(page);
        searchUsers(page);
    }

    function getRule(rule: string): string {
        if(rule === "DIRECTOR") {
            return "Diretor";
        } else if(rule === "MANAGER") {
            return "Gerente";
        } else if(rule === "SELLER") {
            return "Vendedor";
        }
        return "";
    }

    function handleSelect(user: User, checked: boolean) {
        if(checked) {
            setSearchUsers([...searchUser, user]);
        } else {
            setSearchUsers(searchUser.filter(u => u.id !== user.id));
        }
    }

    function isSelected(user: User): boolean {
        return searchUser.filter(u => u.id === user.id).length > 0;
    }

    return (
        <Modal 
            size="6xl"
            closeOnEsc={false}
            closeOnOverlayClick={false}
            isOpen={openSearchUser} 
            onClose={hideSearchUserForm}
            blockScrollOnMount={false}>
            <ModalOverlay />
            <ModalContent 
                m="3" 
                p="0" 
                bg="none">

                <ModalBody 
                    m="3" 
                    p="4">
                    <Box>
                        <Box flex="1" borderRadius={8} bg="gray.700" p="8" >
                            <Flex mb="8" justify="space-between" align="center" >
                                <Heading size="lg" fontWeight="normal" >
                                    Localizar Usuários
                                </Heading>
                            </Flex>

                            <Search setValue={setSearchValue} handlerSearch={handleSearchUser}/>

                            <Box minH="40vh">
                                <Table colorScheme="gray" mt="4" >
                                    <Thead>
                                        <Tr>
                                            <Th w="8"> </Th>
                                            <Th color="gray.300" fontSize="16">
                                                Usuário
                                            </Th>
                                            <Th color="gray.300" fontSize="16"> Perfil </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {!!searchedUser && !!searchedUser.users && searchedUser.users.map(user => 
                                            <Tr key={user.login}>
                                                <Td> <Checkbox size='lg' onChange={(e) => handleSelect(user, e.target.checked)} isChecked={ isSelected(user)}/> </Td>
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
                                                <Td> {getRule(user.rule)} </Td>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            </Box>
                            <Pagination currentPage={page} pages={searchedUser.totalPage } setPage={setPageUserTable}/>
                        
                            <Flex 
                                mt="8" 
                                justify="space-between" >
                                <CancelButton onClick={handleCancelSearch} />
                                
                                <Button
                                    cursor="pointer" 
                                    colorScheme="green"
                                    leftIcon={<Icon as={FiCheck} fontSize="20"/>}
                                    onClick={hideSearchUserForm}
                                    >
                                    Confirmar
                                </Button>
                            </ Flex> 
                        </Box>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default UserSearch;