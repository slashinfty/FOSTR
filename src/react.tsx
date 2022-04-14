import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './index.css';
import { Root } from './views/Root';
import { Setup } from './views/Setup';
import { Wrapper } from './components/Wrapper';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = () => {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light'); //TODO default based on stored settings
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light')),
        }), []
    );
    const theme = React.useMemo(
        () => createTheme({
            palette: { mode }
        }), [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Root />} />
                        <Route path='/setup' element={<Setup />} />
                        <Route path='/fostr' element={<Wrapper colorMode={colorMode} />}>

                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}
 
ReactDOMClient.createRoot(document.getElementById('app')).render(<App />);