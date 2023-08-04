import { Box, Button } from "@mui/material"
import { SearchBox } from "../../SearchBox";
import useDeleteNote from "../../../hooks/useDeleteNote";
import { useData } from "../../../context/DataProvider";

interface Props {
    setIsEdit: (value: boolean) => void,
    isEdit: boolean
}

const Header = ({setIsEdit, isEdit}: Props) => {
    const {note} = useData()
    const {deteteData} = useDeleteNote()
    // console.log('note', note)
    const hundlerEdit = () => setIsEdit(true)

    const hundlerCloseEdit = () => setIsEdit(false)

    const hundlerDelete = async () => {
        const result = confirm('Are you sure you want to delete the note?')
        console.log('result', result)
        if(result) {
            await deteteData(note.id)
        }
    }

    return (
        <Box sx={{
            boxSizing: 'border-box',
            position: 'fixed',
            height: '50px',
            width: 'fill-available',
            backgroundColor: '#fff',
            top: 0,
            borderBottom: '1px solid grey',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 10px'
        }}>
            <Box>
                {isEdit ? (
                    <Button onClick={hundlerCloseEdit}>
                        Close Edit
                    </Button>
                ) : (
                    <Button onClick={hundlerEdit}>
                        Edit
                    </Button>
                )}
                <Button
                    onClick={hundlerDelete}
                >
                    Delete
                </Button>
            </Box>
            <Box>
                <SearchBox />
            </Box>
        </Box>
    )
}

export default Header