import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Button
} from '@mui/material';

declare const window: any;

export const StartButtons = () => {
    const handleLoad = async () => {
        const loadedTournament = await window.electron.loadTournament();
        if (loadedTournament === undefined) {
            return;
        }
        //TODO
    }

    return (
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
                onClick={handleLoad}
            >
                Load Tournament
            </Button>
        </Box>
    )
}