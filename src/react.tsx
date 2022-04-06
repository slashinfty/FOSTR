import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Root } from './views/Root';
import './index.css';
 
ReactDOMClient.createRoot(document.getElementById('app')).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Root />} />
        </Routes>
    </BrowserRouter>
);