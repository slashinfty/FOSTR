import * as React from 'react';
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

/*
Format
Player Limit
Points for a Win
Points for a Draw
Sorting

If Elim
Double

If Swiss/RR
Best of

If playoffs
Double
Consolation
Cut type
Cut limit

Swiss Only
Rounds

RR Only
Double
*/

export const SetupForm = () => {
    const [limitPlayers, setLimitPlayers] = React.useState(false);
    const [format, setFormat] = React.useState(null);
    const [playoffs, setPlayoffs] = React.useState('None');
    const handleSubmit = () => {

    }

    return (
        <FormControl
            component={Box}
            sx={{
                display:'flex',
                flexDirection: 'column',
                gap: '0.5em',
                width: '100%'
            }}
        >
            <TextField
                autoFocus={true}
                id='name'
                label='Name of Tournament'
                required={true}
                variant='standard'
                fullWidth
            />
            <Autocomplete
                id='format'
                fullWidth
                autoComplete={true}
                autoHighlight={true}
                autoSelect={true}
                onChange={(e,v) => setFormat(v)}
                options={['Elimination', 'Double Elimination', 'Swiss', 'Round-Robin', 'Double Round-Robin']}
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
                    <FormControlLabel control={<Checkbox id='playerLimit' onChange={() => setLimitPlayers(!limitPlayers)} />} label='Limit Number of Players?' />
                </FormGroup>
                <TextField
                    id='playerNumber'
                    label='Maximum number of players'
                    variant='standard'
                    type='number'
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
                    id='pointsWin'
                    label='Points for a Win'
                    variant='standard'
                    type='number'
                    defaultValue={1}
                />
                <TextField
                    id='pointsDraw'
                    label='Points for a Draw'
                    variant='standard'
                    type='number'
                    defaultValue={0.5}
                />
                <TextField
                    id='pointsBye'
                    label='Points for a Bye'
                    variant='standard'
                    type='number'
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
                    id='sorting'
                    fullWidth
                    autoComplete={true}
                    autoHighlight={true}
                    autoSelect={true}
                    defaultValue='None'
                    options={['None', 'Ascending', 'Descending']}
                    renderInput={params => <TextField {...params} label='Sorting' variant='standard' required={true} />}
                />
                <Autocomplete
                    id='playoffs'
                    fullWidth
                    autoComplete={true}
                    autoHighlight={true}
                    autoSelect={true}
                    defaultValue='None'
                    onChange={(e,v) => setPlayoffs(v)}
                    disabled={format === null || format.includes('Elimination')}
                    options={['None', 'Elimination', 'Double Elimination']}
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
                    <FormControlLabel control={<Checkbox id='consolation' disabled={playoffs !== 'Elimination'} sx={{ flex: '1 1 0'} } />} label='Third Place Match?' />
                </FormGroup>
                <Autocomplete
                    id='cutType'
                    sx={{ flex: '1 1 0' }}
                    fullWidth
                    autoComplete={true}
                    autoHighlight={true}
                    autoSelect={true}
                    defaultValue='Rank'
                    disabled={playoffs === null || playoffs === 'None'}
                    options={['Rank', 'Points']}
                    renderInput={params => <TextField {...params} label='Playoffs Cut Type' variant='standard' />}
                />
                <TextField
                    id='cutLimit'
                    sx={{ flex: '1 1 0' }}
                    label='Value to Cut At'
                    variant='standard'
                    type='number'
                    defaultValue={8}
                    disabled={playoffs === null || playoffs === 'None'}
                />
            </Box>
        </FormControl>
    )
}