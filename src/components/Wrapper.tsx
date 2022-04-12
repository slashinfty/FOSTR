import * as React from 'react';
import { Outlet } from 'react-router-dom';
import {
    AppBar,
    Box,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import useGlobalState from '@vighnesh153/use-global-state';

export const Wrapper = () => {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [appBarText, setAppBarText] = React.useState('FOSTR');
    const [tournament, setTournament] = useGlobalState('tournament');

    return(
        <Container>
            <Drawer
                open={openDrawer}
            >
                <Box
                    component='div'
                    onClick={() => {
                        console.log(tournament);
                        setOpenDrawer(false);
                    }}
                >
                    <List dense={true}>
                        <ListItem>
                            <ListItemButton>
                                <ChevronLeftIcon />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemButton>
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
                            <ListItemButton>
                                <ListItemText primary='Settings' />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
                                <ListItemText primary='Quit FOSTR' />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
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
                        onClick={() => setOpenDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    {appBarText}
                </Toolbar>
            </AppBar>
            <Box>
                <Outlet context={[appBarText, setAppBarText]}/>
            </Box>
        </Container>
    )
}