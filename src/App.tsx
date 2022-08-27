import React from 'react';
import RoutesConfig from './routes/index';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme';

const App: React.FC = () => (
  <>
    <ChakraProvider theme={theme}>
        <RoutesConfig />
    </ChakraProvider>
  </>
);

export default App;
