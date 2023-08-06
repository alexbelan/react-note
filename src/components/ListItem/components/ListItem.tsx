import { ListItem, ListItemText } from "@mui/material"
import React, { Ref, forwardRef, useMemo } from "react"

interface ListItemProps {
    onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void,
    title: string,
}

const ListItemNote = forwardRef(({onClick, title}: ListItemProps, ref: Ref<HTMLLIElement>) => {

    const titleReplace = useMemo(() => {
        return title ? title.replace(/[#*]/g, '').substring(0, 30) + (title.length > 30 ? '...' : '') : 'New note...'
    }, [title])

    return (
        <ListItem 
            ref={ref}
            sx={{
                cursor: 'pointer',
                padding: '0 10px'
            }}
            onClick={(event) => onClick(event)}
             >
            <ListItemText primary={titleReplace} />
        </ListItem>
    )
})

export default ListItemNote