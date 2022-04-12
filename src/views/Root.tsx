import * as React from 'react';
import { Container } from '@mui/material';

import { Logo } from '../components/Logo';
import { StartButtons } from '../components/StartButtons';

export const Root = () => {
    return (
        <Container
            maxWidth='md'
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20%'
            }}
        >
            <Logo />
            <StartButtons />
        </Container>
    )
}