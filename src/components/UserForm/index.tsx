import { Box, Flex, Heading, HStack, Modal, ModalBody, ModalContent, ModalOverlay, SimpleGrid, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import CancelButton from "../Buttons/CancelButton";
import {Input} from "../Input";
import SaveButton from "../Buttons/SaveButton";
import PersonForm, { PersonYup } from "../PersonForm";
import { User } from "../../domain/models/User";
import { Select, SelectItemProps } from "../Select";
import { FormProps } from "../../utils/FormProps";
import { KeyboardEventHandler, useEffect } from "react";
import { UserService } from "../../services/UserService";
import { useLoading } from "../../contexts/LoadingContext";
import { useMessageContext } from "../../contexts/MessageContext";
import { AxiosError } from "axios";
import { ErrorDTO } from "../../domain/dto/ErrorDTO";
import { useUserForm } from "../../contexts/UserFormContext";
import ResetPassWordButton from "../Buttons/ResetPassWordButton";
import { useConfirmDialogContext } from "../../contexts/ConfirmDialogContext";

const CreateUserFromSchema = yup.object().shape({
    login: yup.string().required("Usuário Obrigatório").min(4, "Usuário deve ter 4 caracteres ou mais"),
    ...PersonYup,
});

const userRules: SelectItemProps[] = [
    { key: "DIRECTOR", label: "Diretor"},
    { key: "MANAGER", label: "Gerente"},
    { key: "SELLER", label: "Vendedor"}
];

const userService = new UserService();

export function UserForm(){

    const { show } = useConfirmDialogContext();

    const { hideForm, open, getUser } = useUserForm();

    const { showLoading, hideLoading} = useLoading();

    const { setErrorMessage, setSuccessMessage } = useMessageContext();

    const { register, handleSubmit, formState, setValue, getValues, setError, reset,  } = useForm<User>({ resolver: yupResolver(CreateUserFromSchema) });

    useEffect(() => {
        const user = getUser();
        if(user && user.id && user.id > 0) {
            reset(user);
        } else {
            reset({
                person: {
                    addresses: [
                        {
                            state: "PR"
                        }
                    ]
                }
            });
        }
    }, [open]);

    const handleSaveUser: SubmitHandler<User> = async (formData) => {
        show("Confirmar", "Deseja salvar os dados do usuário", () => {
            sendUser(formData);
        });
    };


   async function sendUser(formData: User) {
        showLoading();
        try {
            await userService.sendUser(formData);
            if(formData.id && formData.id != null && formData.id > 0 ){
                setSuccessMessage("Usuário alterado com sucesso!");
            } else {
                setSuccessMessage("Usuário criado com sucesso!");
            }
            hideForm();
        } catch (_e) {
            const error = _e as AxiosError;
            const message = error.response?.data as ErrorDTO;
            setErrorMessage("Ocorreu um erro ao enviar o usuário: " + message.message);
            if(message.code === 101) {
                setError("login", { message: message.message});
            }
        }
        hideLoading();
    }

    const checkKeyDown:KeyboardEventHandler = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    return (
        <Modal 
            size="6xl"
            isOpen={open} 
            onClose={hideForm}>
            <ModalOverlay />
            <ModalContent m="3" p="0" bg="none">
                <ModalBody m="3" p="0">
                    <Flex 
                        w="100%" 
                        maxW={1480}
                        mx="auto" >
                        
                        <Box 
                            as={"form"} 
                            onSubmit={handleSubmit(handleSaveUser)}
                            onKeyDown={checkKeyDown}
                            flex="1" 
                            borderRadius={8} 
                            bg="gray.700" 
                            p={["6", "8"]} >

                            <Heading 
                                size="lg" 
                                pb="4"
                                fontWeight="normal" >
                                    {!getUser()? "Criar" : "Atualizar"}  usuário
                            </Heading>

                            <VStack 
                                spacing="4">
                                
                                <SimpleGrid 
                                    minChildWidth="240px" 
                                    spacing="4"
                                    w="100%">
                                    
                                    <Input 
                                        {...register("login")}
                                        error={formState.errors.login}
                                        name="login" 
                                        label="Usuário" />

                                    <Select 
                                        {...register("rule")}
                                        name="rule"
                                        label="Perfil"
                                        itens={userRules} />    

                                </SimpleGrid>

                                <SimpleGrid 
                                    w="100%" 
                                    spacing="4">
                                    
                                    <PersonForm formProps={{ error:formState.errors.person, register, setValue, getValues } as FormProps} />
                                </SimpleGrid>
                            </VStack>

                            <Flex 
                                mt="8" 
                                justify="space-between" >
                                    
                                <ResetPassWordButton />

                                <HStack
                                    spacing="4">

                                    <CancelButton onClick={hideForm} />
                                    
                                    <SaveButton 
                                            type="submit" 
                                            isLoading={formState.isSubmitting}/>

                                    
                                </HStack>    
                            </Flex>
                        </Box>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default UserForm;