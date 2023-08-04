import { TextField, Box, List, ListItem, ListItemText } from "@mui/material"
import parse from 'html-react-parser'
import { useEffect, useMemo, useState } from "react"
import { useData } from "../../../context/DataProvider"
import { marked } from "marked"
import useDebounce from "../../../hooks/useDebounce"

const SearchBox = () => {
    const {note} = useData()
    const [value, setValue] = useState<string>('')
    const [searchItems, setSearchItems] = useState<string[]>([])

    const listParagrapg: string[] = useMemo(() => {
        if(!!note?.body) {
            const parseData: string | JSX.Element | JSX.Element[] = parse(marked.parse(note.body))
            return Array.isArray(parseData) ? parseData.filter(element => typeof element !== 'string')
                .map(item => typeof item.props.children === 'string' ? item.props.children : item.props.children.props.children) : []
        } else {
            return []
        }
    }, [note?.body])

    const hundlerSearch = (value: string) => {
        const result = listParagrapg.filter((element, index) => element.includes(value) && index < 5)
        setSearchItems(!!value ? result : [])
    }

    useDebounce(() => {
        console.log('hundlerSearch')
        hundlerSearch(value)
    }, 500, [value])

    return (
        <>
        <TextField 
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
            size='small'
            id="filled-basic"
            label="Search"
            variant="filled" />
        <Box sx={{
            position: 'absolute',
            boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)',
            width: '170px',
            padding: '10px',
            borderRadius: '10px',
            display: searchItems.length > 0 ? 'block' : 'none'
        }}>
            <List>
                {searchItems.map(item => (
                    <ListItem disablePadding>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
        </Box>
    </>)
}

export default SearchBox