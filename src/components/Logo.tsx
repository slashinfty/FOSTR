import * as React from 'react';
import {
    Box,
    Tooltip
} from '@mui/material';

const logo = new URL('../assets/fostr.svg', import.meta.url).toString();

export const Logo = () => (
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
)