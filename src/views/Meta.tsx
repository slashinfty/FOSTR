import * as React from 'react';
import { useOutletContext } from 'react-router-dom';
import {
    Container
} from '@mui/material';

export const Meta = () => {
    const [appBarText, setAppBarText, tournament, setTournament] = useOutletContext<any>();

    React.useEffect(() => setAppBarText(`FOSTR - ${tournament.name}`)); // add name as dependent

    return (
        <Container
            maxWidth='md'
            sx={{
                marginTop: '10%'
            }}
        >

        </Container>
    )
}