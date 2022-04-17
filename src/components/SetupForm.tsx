import * as React from 'react';
import { useNavigate } from "react-router-dom";
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    TextField
} from '@mui/material';
import { useSnackbar } from 'notistack';
import useGlobalState from '@vighnesh153/use-global-state';

const TournamentOrganizer = require('tournament-organizer').default;

import { Tiebreaks } from './Tiebreaks';

export const SetupForm = (props) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [name, setName] = React.useState(null);
    const [limitPlayers, setLimitPlayers] = React.useState(false);
    const [numberOfPlayers, setNumberOfPlayers] = React.useState(0);
    const [format, setFormat] = React.useState(null);
    const [winValue, setWinValue] = React.useState(1);
    const [drawValue, setDrawValue] = React.useState(0.5);
    const [byeValue, setByeValue] = React.useState(1);
    const [sorting, setSorting] = React.useState('None');
    const [playoffs, setPlayoffs] = React.useState('None');
    const [cutType, setCutType] = React.useState('Rank');
    const [cutLimit, setCutLimit] = React.useState(8);
    const [consolation, setConsolation] = React.useState(false);
    const [roundLimit, setRoundLimit] = React.useState(false);
    const [numberOfRounds, setNumberOfRounds] = React.useState(0);
    const [bestOf, setBestOf] = React.useState(1);
    const [numberTiebreaks, setNumberTiebreaks] = React.useState(1);
    const [draggableTiebreaks, setDraggableTiebreaks] = useGlobalState('draggableTiebreaks', false);
    const [tiebreaks, setTiebreaks] = React.useState([
        { id: 1, text: 'Median Buchholz', value: 'median buchholz' },
        { id: 2, text: 'Solkoff', value: 'solkoff' },
        { id: 3, text: 'Sonneborn Berger', value: 'sonneborn berger' },
        { id: 4, text: 'Cumulative', value: 'cumulative' },
        { id: 5, text: 'Versus', value: 'versus' },
        { id: 6, text: 'Game Win %', value: 'game win percentage' },
        { id: 7, text: 'Opp Game Win %', value: 'opponent game win percentage' },
        { id: 8, text: 'Opp Match Win %', value: 'opponent match win percentage' },
        { id: 9, text: 'Opp Opp Match Win %', value: 'opponent opponent match win percentage' }
    ]);

    React.useEffect(() => {
        setDraggableTiebreaks(format !== null && (format.includes('Swiss') || format.includes('Round Robin')));
    }, [format]);

    const handleSubmit = () => {
        const snack = text => {
            enqueueSnackbar(text, {
                variant: 'error',
                autoHideDuration: 3000
            });
        }
        let escape = false;
        if (name === null) {
            snack(`Name is required.`);
            escape = true;
        }
        if (format === null) {
            snack(`Format is required.`);
            escape = true;
        }
        if (escape) return;
        const options = {
            'name': name,
            'format': format.toLowerCase(),
            'sorting': sorting.toLowerCase()
        }
        if (limitPlayers === true && numberOfPlayers > 3) {
            Object.assign(options, {
                'playerLimit': numberOfPlayers
            });
        }
        if (winValue !== 1) {
            Object.assign(options, {
                'pointsForWin': winValue === null ? 1 : winValue
            });
        }
        if (drawValue !== 0.5) {
            Object.assign(options, {
                'pointsForDraw': drawValue === null ? 0.5 : drawValue
            });
        }
        if (!format.includes('Elimination')) {
            Object.assign(options, {
                'bestOf': bestOf === null ? 1 : bestOf,
                'playoffs': playoffs.toLowerCase()
            });
            if (byeValue !== 1) {
                Object.assign(options, {
                    'pointsForBye': byeValue === null ? 1 : byeValue
                });
            }
            if (playoffs !== 'None') {
                Object.assign(options, {
                    'cut': {
                        'type': cutType.toLowerCase(),
                        'limit': cutLimit < 0 || cutLimit === null ? 0 : cutLimit
                    }
                });
            }
            if (numberTiebreaks > 0) {
                Object.assign(options, {
                    'tiebreakers': tiebreaks.slice(0, numberTiebreaks).map(t => t.value)
                });
            }
            if (format === 'Swiss' && roundLimit === true && numberOfRounds > 0) {
                Object.assign(options, {
                    'rounds': numberOfRounds === null ? 0 : numberOfRounds
                });
            }
        }
        if (format === 'Single Elimination' || playoffs === 'Single Elimination') {
            Object.assign(options, {
                'consolation': consolation
            });
        }
        if (format === 'Double Elimination' || format === 'Double Round Robin') {
            Object.assign(options, {
                'double': true
            });
        }
        const manager = new TournamentOrganizer();
        const newTournament = manager.newTournament(options);
        props.setTournament(newTournament);
        navigate('../fostr/meta');
    }

    return (
        <FormControl
            component={Box}
            sx={{
                display:'flex',
                flexDirection: 'column',
                gap: '0.5em',
                width: '100%',
                marginBottom: '6em'
            }}
        >
            <TextField
                autoFocus={true}
                label='Name of Tournament'
                required={true}
                variant='standard'
                onChange={e => setName(e.target.value)}
                fullWidth
            />
            <Autocomplete
                fullWidth
                autoComplete={true}
                autoHighlight={true}
                autoSelect={true}
                disableClearable={true}
                onChange={(e,v) => setFormat(v)}
                options={['Single Elimination', 'Double Elimination', 'Swiss', 'Round Robin', 'Double Round Robin']}
                renderInput={params => <TextField {...params} label='Format' variant='standard' required={true} />}
            />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                }}
            >
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={() => setLimitPlayers(!limitPlayers)} />} label='Limit Number of Players?' />
                </FormGroup>
                <TextField
                    label='Maximum number of players'
                    variant='standard'
                    type='number'
                    onChange={e => setNumberOfPlayers(parseInt(e.target.value))}
                    disabled={!limitPlayers}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: '1em'
                }}
            >
                <TextField
                    label='Points for a Win'
                    variant='standard'
                    type='number'
                    onChange={e => setWinValue(Number(e.target.value))}
                    defaultValue={1}
                />
                <TextField
                    label='Points for a Draw'
                    variant='standard'
                    type='number'
                    onChange={e => setDrawValue(Number(e.target.value))}
                    defaultValue={0.5}
                />
                <TextField
                    label='Points for a Bye'
                    variant='standard'
                    type='number'
                    onChange={e => setByeValue(Number(e.target.value))}
                    defaultValue={1}
                    disabled={format === null || format.includes('Elimination')}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: '1em'
                }}
            >
                <Autocomplete
                    fullWidth
                    autoComplete={true}
                    autoHighlight={true}
                    autoSelect={true}
                    disableClearable={true}
                    defaultValue='None'
                    onChange={(e, v) => setSorting(v)}
                    options={['None', 'Ascending', 'Descending']}
                    renderInput={params => <TextField {...params} label='Sorting' variant='standard' required={true} />}
                />
                <Autocomplete
                    fullWidth
                    autoComplete={true}
                    autoHighlight={true}
                    autoSelect={true}
                    disableClearable={true}
                    defaultValue='None'
                    onChange={(e,v) => setPlayoffs(v)}
                    disabled={format === null || format.includes('Elimination')}
                    options={['None', 'Single Elimination', 'Double Elimination']}
                    renderInput={params => <TextField {...params} label='Playoffs Format' variant='standard' required={true} />}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: '1em'
                }}
            >
                <FormGroup>
                    <FormControlLabel control={<Checkbox disabled={!(playoffs === 'Elimination' || format === 'Elimination')} onChange={() => setConsolation(!consolation)} sx={{ flex: '1 1 0'} } />} label='Third Place Match?' />
                </FormGroup>
                <Autocomplete
                    sx={{ flex: '1 1 0' }}
                    fullWidth
                    autoComplete={true}
                    autoHighlight={true}
                    autoSelect={true}
                    disableClearable={true}
                    defaultValue='Rank'
                    onChange={(e,v) => setCutType(v)}
                    disabled={playoffs === null || playoffs === 'None'}
                    options={['Rank', 'Points']}
                    renderInput={params => <TextField {...params} label='Playoffs Cut Type' variant='standard' />}
                />
                <TextField
                    sx={{ flex: '1 1 0' }}
                    label='Value to Cut At'
                    variant='standard'
                    type='number'
                    onChange={e => setCutLimit(parseInt(e.target.value))}
                    defaultValue={8}
                    disabled={playoffs === null || playoffs === 'None'}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: '1em'
                }}
            >
                <FormGroup>
                    <FormControlLabel control={<Checkbox id='roundLimit' disabled={format !== 'Swiss'} onChange={() => setRoundLimit(!roundLimit)} sx={{ flex: '1 1 0'} } />} label='Set Number of Rounds?' />
                </FormGroup>
                <TextField
                    sx={{ flex: '1 1 0' }}
                    label='Number of Rounds'
                    variant='standard'
                    type='number'
                    onChange={e => setNumberOfRounds(parseInt(e.target.value))}
                    disabled={!roundLimit || format !== 'Swiss'}
                />
                <TextField
                    sx={{ flex: '1 1 0' }}
                    label='Maximum Number of Games'
                    variant='standard'
                    type='number'
                    onChange={e => setBestOf(parseInt(e.target.value))}
                    defaultValue={1}
                    disabled={format === null || format.includes('Elimination')}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1em',
                    marginTop: '0.5em'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1em'
                    }}
                >
                    <TextField
                        sx={{ flex: '1 1 0' }}
                        label='Number of Tiebreakers to Use'
                        variant='standard'
                        type='number'
                        onChange={e => setNumberTiebreaks(parseInt(e.target.value))}
                        defaultValue={1}
                        disabled={format === null || format.includes('Elimination')}
                    />
                    <p>
                        Sort the tiebreakers to the right. Top {numberTiebreaks} will be used, in order.
                    </p>
                </Box>
                <Tiebreaks cards={tiebreaks} setCards={setTiebreaks} />
            </Box>
            <Button
                disableRipple={true}
                onClick={handleSubmit}
            >
                Create Tournament
            </Button>
        </FormControl>
    )
}