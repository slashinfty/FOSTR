import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Icon
} from '@mui/material';

const logo = new URL('../assets/fostr.svg', import.meta.url).toString();

export const Root = () => {
    //states?

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20%'
            }}
            maxWidth='md'
        >
            <Box
                sx={{
                    maxWidth: '50%'
                }}
            >
                <img src={logo} width={'100%'} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    maxWidth: '30%'
                }}
            >
                <Button
                    variant='outlined'
                    component={Link}
                    to={'new'}
                >
                    New Tournament
                </Button>
                <Button
                    variant='outlined'
                >
                    Continue Tournament
                </Button>
                <Button
                    variant='outlined'
                >
                    Load Tournament
                </Button>
            </Box>
        </Container>
    )
}