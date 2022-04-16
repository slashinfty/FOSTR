import * as React from 'react';
import { useOutletContext } from 'react-router-dom';

export const Meta = () => {
    const [appBarText, setAppBarText, tournament, setTournament] = useOutletContext<any>();

    React.useEffect(() => setAppBarText(`FOSTR - ${tournament.name}`));

    return (
        <div>Hello world!</div>
    )
}