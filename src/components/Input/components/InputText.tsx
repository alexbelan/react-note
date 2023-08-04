import {
    FormControl,
    TextField
} from '@mui/material';
import { useMemo } from 'react';
import { PropsInputText } from './interfaces';

const InputText = <T extends string | number>({
    label='',
    defaultValue=null,
    value,
    id=null,
    type='text',
    erorr=null,
    name,
    onChange,
    sx,
}: PropsInputText<T>) => {

    const inputId = useMemo(() => {
        return id ? id : name + '-' + window.crypto.randomUUID()
    }, [id, name])
 
    return (
        <FormControl error={!!erorr && typeof erorr === 'string'} sx={{width: '100%'}}>
            <TextField
                sx={{...sx}}
                error={!!erorr && typeof erorr === 'string'}
                label={!!label && label}
                type={type}
                name={name}
                id={inputId}
                defaultValue={!!defaultValue ? '' : null}
                value={value}
                onChange={onChange}
                aria-describedby="component-error-text"
                helperText={!!erorr && typeof erorr === 'string' ? erorr : ''}
            />
        </FormControl>
    )
}

export default InputText