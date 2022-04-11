import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Tooltip
} from '@mui/material';

declare const window: any;

const logo = new URL('../assets/fostr.svg', import.meta.url).toString();

export const Root = () => {
    const handleLoad = async () => {
        const tournament = await window.electron.loadTournament();
        if (tournament === undefined) {
            console.log('undefined');
            return;
        }
        console.log(tournament);
    }

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
                <Tooltip
                    title={
                        <React.Fragment>
                            <Box
                                sx={{
                                    textAlign: 'center'
                                }}
                            >
                                Version 0.0.1<br /><br />Released 11 April 2022
                            </Box>
                        </React.Fragment>
                    }
                >
                    <img src={logo} width={'100%'} />
                </Tooltip>
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
                    onClick={() => handleLoad()}
                >
                    Load Tournament
                </Button>
            </Box>
        </Container>
    )
}