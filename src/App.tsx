import React from 'react';
import RoutesConfig from './routes/index';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme';
import { SidebarDrawerProvider } from './contexts/SidebarDrawerContext';
import { AuthenticationContextProvider } from './contexts/AuthenticationContext';
import { BrowserRouter } from 'react-router-dom';
import { AppAuthenticationContexProvider } from './contexts/AppAuthenticationContex';
import { MessageContextProvider } from './contexts/MessageContext';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <MessageContextProvider>
        <AuthenticationContextProvider>
          <ChakraProvider theme={theme}>
                <AppAuthenticationContexProvider>
                  <SidebarDrawerProvider>
                    <RoutesConfig />
                  </SidebarDrawerProvider>
                </AppAuthenticationContexProvider>
          </ChakraProvider>
        </AuthenticationContextProvider>
      </MessageContextProvider>
    </BrowserRouter>
  </>
);

export default App;
