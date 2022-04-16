import * as React from 'react';
import { Outlet } from 'react-router-dom';
import {
    Box,
    Container
} from '@mui/material';
import useGlobalState from '@vighnesh153/use-global-state';

import { Header } from './Header';
import { Menu } from './Menu';

export const Wrapper = (props) => {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [appBarText, setAppBarText] = React.useState('FOSTR');
    const [tournament, setTournament] = useGlobalState('tournament');

    React.useEffect(() => console.log(tournament));

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
                <Outlet context={[appBarText, setAppBarText]}/>
            </Box>
        </Container>
    )
}