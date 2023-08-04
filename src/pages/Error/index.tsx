import { Box } from "@mui/material"
import ErrorIcon from '../../svg/free-icon-oops-4456153.svg'

const Error = () => {
    return (
        <Box sx={{
            display: 'flex',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            paddingTop: '100px'
        }}>
            <img src={ErrorIcon} width={200} />
            <h1>Some error has occurred</h1>
        </Box>
    )
}

export default Error