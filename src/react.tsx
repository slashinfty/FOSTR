import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Zoom from '@mui/material/Zoom';
import { SnackbarProvider } from 'notistack';

import './index.css';
import { Root } from './views/Root';
import { Setup } from './views/Setup';
import { Wrapper } from './components/Wrapper';
import { Meta } from './views/Meta';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

declare const window: any;

const App = () => {
    const [tournament, setTournament] = React.useState({});
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
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

    React.useEffect(() => {
        const getStore = async (prop) => {
            const val = await window.electron.store('get', prop);
            return val;
        }
        getStore('mode').then(val => val === undefined ? null : setMode(val));
        getStore('tournament').then(val => val === undefined ? null : setTournament(val));
    }, []);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider 
                    maxSnack={4}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    TransitionComponent={Zoom}
                >
                    <CssBaseline />
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Root />} />
                            <Route path='/setup' element={<Setup setTournament={setTournament} />} />
                            <Route path='/fostr' element={<Wrapper colorMode={colorMode} tournament={tournament} setTournament={setTournament} />}>
                                <Route path='/fostr/meta' element={<Meta />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </SnackbarProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}
 
ReactDOMClient.createRoot(document.getElementById('app')).render(<App />);