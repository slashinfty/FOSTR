import * as React from 'react';
import {
    Container
} from '@mui/material';

import { SetupForm } from '../components/SetupForm';

export const Setup = () => (
    <Container
        maxWidth='sm'
        sx={{
            marginTop: '10%'
        }}
    >
        <h1>Create a New Tournament</h1>
        <SetupForm />
    </Container>
)