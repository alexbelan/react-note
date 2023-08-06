import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"

type Props = {
  children: JSX.Element
}

const PrivateRoute = ({children}: Props) => {
    const auth = useAuth()
    const location = useLocation()

    if(auth.user === null) {
        return <Navigate to={'/login'} state={{from: location.pathname}} replace />
    }

    return children
}

export default PrivateRoute