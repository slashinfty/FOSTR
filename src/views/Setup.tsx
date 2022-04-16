import * as React from 'react';
import {
    Container
} from '@mui/material';

import { SetupForm } from '../components/SetupForm';

export const Setup = (props) => (
    <Container
        maxWidth='md'
        sx={{
            marginTop: '10%'
        }}
    >
        <h1>Create a New Tournament</h1>
        <SetupForm setTournament={props.setTournament} />
    </Container>
)