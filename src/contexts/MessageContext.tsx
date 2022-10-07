import { useToast } from "@chakra-ui/react";
import { createContext, ReactNode, useContext } from "react";

type MessageContextProps = {
    setSuccessMessage(message: string): void,
    setErrorMessage(message: string): void
}

interface MessageContextProviderProps {
    children: ReactNode
} 

const MessageContext = createContext<MessageContextProps>({} as MessageContextProps);

export function MessageContextProvider({children}:MessageContextProviderProps) {

    const toast = useToast();

    function setSuccessMessage(message: string) {
        toast({
            title: "Atenção",
            description: message,
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: "top"
          })
    }

    function setErrorMessage(message: string) {
        toast({
            title: "Atenção",
            description: message,
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: "top"
          })
    }

    return (
        <MessageContext.Provider value={{setErrorMessage, setSuccessMessage}}>
            {children}
        </MessageContext.Provider>
    )
}

export const useMessageContext = () => useContext(MessageContext);