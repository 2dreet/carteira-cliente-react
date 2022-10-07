import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { HiOutlineKey } from 'react-icons/hi';
import { useConfirmDialogContext } from "../../../contexts/ConfirmDialogContext";
import { useLoading } from "../../../contexts/LoadingContext";
import { useMessageContext } from "../../../contexts/MessageContext";
import { useUserForm } from "../../../contexts/UserFormContext";
import { ErrorDTO } from "../../../domain/dto/ErrorDTO";
import { UserService } from "../../../services/UserService";
 
const userService = new UserService();

export function ResetPassWordButton({...rest}: ButtonProps) {

    const { show } = useConfirmDialogContext();
    const { setErrorMessage, setSuccessMessage } = useMessageContext();
    const { showLoading, hideLoading} = useLoading();
    const { getUser } = useUserForm();

    async function handleResetPassword() {
        const login = getUser()?.login;
        if(login && login != null && login.length > 0) {
            show("Confirmar", "Deseja resetar a senha do usuário", () => {
                resetPassword(login);
            });
        }
    };

    async function resetPassword(login: string) {
        showLoading();
        try {
            await userService.resetPasswrod(login);
            setSuccessMessage("Senha do usuário resetada com sucesso!");
        } catch (_e) {
            const error = _e as AxiosError;
            const message = error.response?.data as ErrorDTO;
            setErrorMessage("Ocorreu um erro ao resetar senha do usuário: " + message.message);
        }
        hideLoading();
    }

    return(
        <Button
            {...rest}
            cursor="pointer" 
            colorScheme="orange"
            leftIcon={<Icon as={HiOutlineKey} fontSize="20" />}
            onClick={handleResetPassword}
            >
            Resetar senha
        </Button>
    )
}
export default ResetPassWordButton;