import * as React from 'react';
import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    TextField
} from '@mui/material';

export const SetupForm = () => {
    const handleSubmit = () => {
        
    }

    return (
        <FormControl
            component={Box}
            sx={{
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
                sx={{
                    marginTop: '0.4em'
                }}
                fullWidth
                options={['Elimination', 'Swiss', 'Round-Robin']}
                renderInput={params => <TextField {...params} label='Format' variant='standard' required={true} />}
            />
        </FormControl>
    )
}