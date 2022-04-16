import * as React from 'react';
import { Outlet } from 'react-router-dom';
import {
    Box,
    Container
} from '@mui/material';

import { Header } from './Header';
import { Menu } from './Menu';

export const Wrapper = (props) => {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [appBarText, setAppBarText] = React.useState('FOSTR');
    const tournament = props.tournament;
    const setTournament = props.setTournament;

    return(
        <Container>
            <Menu 
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                colorMode={props.colorMode}
            />
            <Header
                setOpenDrawer={setOpenDrawer}
                appBarText={appBarText}
            />
            <Box>
                <Outlet context={[appBarText, setAppBarText, tournament, setTournament]} />
            </Box>
        </Container>
    )
}