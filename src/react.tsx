import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

import { Start } from './Views/Start';
 
ReactDOMClient.createRoot(document.getElementById('app')).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Start />} />
        </Routes>
    </BrowserRouter>
);