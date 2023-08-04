import { Box } from "@mui/material"
import { Outlet, useLocation } from "react-router"
import ListNotesHeader from "./components/ListNotesHeader"
import { Sidebar } from "../../components/Sidebar"

const Main = () => {
    const location = useLocation()

    console.log('location.pathname', location.pathname)

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-start'
        }}>
            <Box sx={{
                width: '400px',
                borderRight: '1px solid #000000',
                height: '100vh'
            }}>
                <ListNotesHeader />
                <Sidebar />
            </Box>
            {!!location.pathname && 
                <Outlet />
            }
        </Box>
    )
}

export default Main