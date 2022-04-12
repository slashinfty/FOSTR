import * as React from 'react';
import {
    AppBar,
    IconButton,
    Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const Header = (props) => (
    <AppBar
        position='fixed'
        style={{
            backgroundColor: 'white',
            color: 'black'
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