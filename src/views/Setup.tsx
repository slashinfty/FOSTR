import * as React from 'react';
import { Container } from '@mui/material';

import { SetupForm } from '../components/SetupForm';

export const Setup = () => (
    <Container
        maxWidth='sm'
        sx={{
            marginTop: '10%'
        }}
    >
        <SetupForm />
    </Container>
)