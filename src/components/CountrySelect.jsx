import * as React from 'react';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { chooseCountry1, chooseCountry2 } from '../actions/templateActions';

export default function CountrySelect({countrySelection}) {
    
    const dispatch = useDispatch();

    const [value, setValue] = React.useState('');

    const countries = useSelector(state => state.populationRDC.countryChoices)

    
    useEffect(() => {
        // console.log(countrySelection);
        
        if(value && countrySelection===1){
            dispatch(chooseCountry1(value.index))
        }
        if(value && countrySelection===2){
            // console.log('dispatching');
            // console.log(value);
            dispatch(chooseCountry2(value.index))
        }
        
    }, [value])

    return (
        <Autocomplete className="w-100" onChange={(event, newValue) => {
            setValue(newValue);
          }}
            id="country-select-demo"
            sx={{ width: 300 }}
            options={countries}
            size='small'
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box  component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                    />
                    {option.label} ({option.index}) 
                </Box>
            )}
            renderInput={(params) => (
                <TextField 
                    {...params}
                    label="Choose a country"
                    variant='standard'
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}

