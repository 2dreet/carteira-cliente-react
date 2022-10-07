import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";

interface LoadingContextProps {
    showLoading: () => void,
    hideLoading: () => void,
}

interface LoadingContextProviderProps {
    children: ReactNode
}

const LoadingContext = createContext<LoadingContextProps>({ } as LoadingContextProps);

export function LoadingContextProvider( { children }: LoadingContextProviderProps) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    function showLoading() {
        onOpen();
    }

    function hideLoading() {
        onClose();
    }

    return (
        <LoadingContext.Provider value={{ showLoading, hideLoading}}>
            <Modal 
                isCentered 
                closeOnOverlayClick={false} 
                isOpen={isOpen} 
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent 
                    w="100px" 
                    background="none"
                    boxShadow="none">
                    <ModalBody 
                        w="100px" 
                        border="none"
                        boxShadow="none">
                        <Spinner 
                            thickness='6px'
                            speed='0.95s'
                            size='xl'/>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {children}
        </LoadingContext.Provider>
    );
}

export const useLoading = () => useContext(LoadingContext);