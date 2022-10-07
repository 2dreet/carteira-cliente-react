import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, HStack, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { createContext, ReactNode, useContext, useState } from "react";

export interface ConfirmDialogContextData {
    show( title: string, description: string, callbackConfirm:()=>void): void,
}

interface ConfirmDialogContextProviderProps {
    children: ReactNode
}

const ConfirmDialogContext = createContext<ConfirmDialogContextData>({} as ConfirmDialogContextData);

var callback:() => void;

export function ConfirmDialogContextProvider({ children }: ConfirmDialogContextProviderProps) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef<HTMLButtonElement>(null)

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    

    function show( title: string, description: string, callbackConfirm:()=>void) { 
        callback = callbackConfirm;
        setTitle(title);
        setDescription(description);
        onOpen();
    }

    function handlerConfirm() {
        onClose();
        if(callback) {
            callback();
        }
    }

    return(
        <ConfirmDialogContext.Provider value={{ show }}>
            {children}
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
                >
                    <AlertDialogOverlay />

                    <AlertDialogContent bg="gray.700">
                        <AlertDialogHeader>
                                {title}?
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            {description}.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <HStack 
                                w="100%"
                                justify="space-between" >
                                <Button 
                                    ref={cancelRef} 
                                    colorScheme="red"
                                    onClick={onClose}>
                                    Cancelar
                                </Button>
                                <Button 
                                    colorScheme='green' 
                                    ml={3} 
                                    onClick={handlerConfirm}>
                                    Confirmar
                                </Button>
                            </HStack>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
        </ConfirmDialogContext.Provider>
    )
}

export const useConfirmDialogContext = () => useContext(ConfirmDialogContext);