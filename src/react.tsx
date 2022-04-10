import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import { Root } from './views/Root';
import { Wrapper } from './components/Wrapper';
 
ReactDOMClient.createRoot(document.getElementById('app')).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Root />} />
            <Route path='fostr' element={<Wrapper />}>

            </Route>
        </Routes>
    </BrowserRouter>
);