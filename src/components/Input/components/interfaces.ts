import React from 'react'
import { SxProps } from '@mui/system';

export interface PropsInputText <T extends number | string>{
    label?: string,
    defaultValue?: T,
    value: T,
    id?: string,
    type?: 'text' | 'password' | 'number' | 'email',
    erorr?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    name: string,
    sx?: SxProps,
}