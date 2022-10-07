import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './contexts/AppContext';

const App: React.FC = () => (
  <>
    <BrowserRouter>
        <AppContextProvider />
    </BrowserRouter>
  </>
);

export default App;
