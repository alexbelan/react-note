import { useCallback, useEffect } from "react"
import { useAuth } from "../../context/AuthProvider"
import { useLocation, useNavigate } from "react-router"
import Form from "./components/Form"

const Login = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const chack = useCallback(() => {
        if(auth.user) {
            navigate(location.state?.from || '/')
        }
    }, [auth.user, navigate, location.state?.from])

    useEffect(() => {
        chack()
    }, [chack])


    return (<Form />)
 }

 export default Login