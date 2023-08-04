import { useEffect } from "react"
import { useAuth } from "../../context/AuthProvider"
import { useLocation, useNavigate } from "react-router"
import Form from "./components/Form"

const Login = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if(auth.user) {
            navigate(location.state?.from || '/')
        }
    }, [])


    return (<Form />)
 }

 export default Login