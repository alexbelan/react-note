import { createContext, useContext, useState } from "react"
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase'
import { PropsChildren } from "../interfaces/reactComponents";

interface ProviderValue {
    user: User | null,
    signin: <T>(email: string, password: string, callbeck: () => void) => Promise<T>,
    signout: (callback: () => void) => void
}

const AuthContext = createContext({
    user: null,
    signin: (email: string, password: string, callbeck: () => void) => {},
    signout: (callback: () => void) => {}
})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}: PropsChildren) => {
    const [userData, setUserData] = useState(() => {
        const userString = localStorage.getItem('user')
        console.log('userString', userString)
        if(userString && typeof userString === 'string') {
            return JSON.parse(userString)
        }
        return null
    })

    const signin = async (email: string, password: string, callbeck: () => void) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUserData(user)
                localStorage.setItem('user', JSON.stringify(user))
                callbeck()
                return 'Success'
            }).catch(error => {
                return error
            })
    }

    const signout = (callbeck: () => void) => {
        setUserData(null)
        localStorage.removeItem('user')
        callbeck()
    }

    return (
        <AuthContext.Provider value={{
            user: userData,
            signin,
            signout
        }}>
            {children}
        </AuthContext.Provider>
    )
}