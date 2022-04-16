import * as React from 'react';
import { useNavigate } from "react-router-dom";
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

declare const window: any;

export const Menu = (props) => {
    const theme = useTheme();
    const colorMode = props.colorMode;
    const navigate = useNavigate();

    const handleQuit = async () => {
        await window.electron.quit();
    }

    return (
        <Drawer
            open={props.openDrawer}
        >
            <Box
                component='div'
            >
                <List dense={true}>
                    <ListItem>
                        <ListItemButton
                            onClick={() => props.setOpenDrawer(false)}
                        >
                            <ChevronLeftIcon />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton
                            onClick={() => {
                                props.setOpenDrawer(false);
                                navigate('/fostr/meta');
                            }}
                        >
                            <ListItemText primary='Metadata' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary='Players' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary='Pairings' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary='Standings' />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary='Create Backup' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary='Save Tournament' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary='Load Tournament' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary='Close Tournament' />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton
                            onClick={colorMode.toggleColorMode}
                        >
                            <ListItemText primary={theme.palette.mode === 'dark' ? 'Dark Mode' : 'Light Mode'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary='Settings' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            onClick={handleQuit}
                        >
                            <ListItemText primary='Quit FOSTR' />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}