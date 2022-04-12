import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Tooltip
} from '@mui/material';
import useGlobalState from '@vighnesh153/use-global-state';

declare const window: any;

const logo = new URL('../assets/fostr.svg', import.meta.url).toString();

export const Root = () => {
    const [tournament, setTournament] = useGlobalState('tournament', {}); //TODO update to saved for continue

    const handleLoad = async () => {
        const loadedTournament = await window.electron.loadTournament();
        if (loadedTournament === undefined) {
            return;
        }
        //TODO
    }

    return (
        <Container
            maxWidth='md'
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20%'
            }}
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
                    to={'setup'}
                    disableRipple={true}
                >
                    New Tournament
                </Button>
                <Button
                    variant='outlined'
                    disableRipple={true}
                >
                    Continue Tournament
                </Button>
                <Button
                    variant='outlined'
                    disableRipple={true}
                    onClick={() => handleLoad()}
                >
                    Load Tournament
                </Button>
            </Box>
        </Container>
    )
}