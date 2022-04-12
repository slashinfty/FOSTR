import * as React from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Container,
    FormControl,
    TextField
} from '@mui/material';

export const Setup = () => {
    const handleSubmit = () => {

    }
    
    return (
        <Container
            maxWidth='sm'
            sx={{
                marginTop: '10%'
            }}
        >
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
        </Container>
    )
}