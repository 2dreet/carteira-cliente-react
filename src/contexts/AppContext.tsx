import { createContext } from "react";
import { AppFormContextProvider } from "./AppFormContext";

import RoutesConfig from '../routes/index';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { AuthenticationContextProvider } from '../contexts/AuthenticationContext';
import { AppAuthenticationContexProvider } from '../contexts/AppAuthenticationContex';
import { MessageContextProvider } from '../contexts/MessageContext';
import { LoadingContextProvider } from '../contexts/LoadingContext';
import { ConfirmDialogContextProvider } from "./ConfirmDialogContext";

const AppContext = createContext("");

export function AppContextProvider() {
    return (
        <AppContext.Provider value={""}>
            <AppFormContextProvider>
                <MessageContextProvider>
                    <AuthenticationContextProvider>
                        <ChakraProvider theme={theme}>
                            <ConfirmDialogContextProvider>
                                <LoadingContextProvider>
                                    <AppAuthenticationContexProvider>
                                        <SidebarDrawerProvider>
                                            <RoutesConfig />
                                        </SidebarDrawerProvider>
                                    </AppAuthenticationContexProvider>
                                </LoadingContextProvider>
                            </ConfirmDialogContextProvider>
                        </ChakraProvider>
                    </AuthenticationContextProvider>
                </MessageContextProvider>
            </AppFormContextProvider>
        </AppContext.Provider>
    )
}