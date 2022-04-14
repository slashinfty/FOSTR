import * as React from 'react';
import {
    Box,
    Tooltip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const logo = new URL('../assets/fostr.svg', import.meta.url).toString();

export const Logo = () => {
    const theme = useTheme();

    return (
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
                <img src={logo} width={'100%'} style={{filter: `invert(${theme.palette.mode === 'dark' ? 1 : 0})`}} />
            </Tooltip>
        </Box>
    )
}