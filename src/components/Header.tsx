import * as React from 'react';
import {
    AppBar,
    IconButton,
    Toolbar
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

export const Header = (props) => {
    const theme = useTheme();

    return (
        <AppBar
            position='fixed'
            style={{
                backgroundColor: `${theme.palette.mode === 'dark' ? '#121212' : '#fff'}`,
                color: `${theme.palette.mode === 'dark' ? '#fff' : '#000'}`
            }}
        >
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'
                    onClick={() => props.setOpenDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                {props.appBarText}
            </Toolbar>
        </AppBar>
    )
}