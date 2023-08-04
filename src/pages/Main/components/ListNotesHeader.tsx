import { Box, IconButton } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import useAddNote from "../../../hooks/useAddNote";
import { useNavigate } from "react-router";

const ListNotesHeader = () => {
    const navigate = useNavigate()
    const {addData} = useAddNote()

    const handleClickAddNote = async () => {
        const id = await addData()
        navigate(`/${id}`)
    }

    return (
        <Box sx={{
            boxSizing: 'border-box',
            height: '50px',
            width: '100%',
            backgroundColor: '#fff',
            position: 'sticky',
            zIndex: 1000,
            top: 0,
            borderBottom: '1px solid grey',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '0 10px'
        }}>
            <IconButton onClick={handleClickAddNote}>
                <AddIcon />
            </IconButton>
        </Box>
    )
}

export default ListNotesHeader
