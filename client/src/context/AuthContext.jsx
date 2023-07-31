import { createContext, useContext, useEffect, useState } from 'react'
import { loginRequest, logoutRequest, registerRequest, verifyToken } from '../api/auth'
import Cookies from 'js-cookie'
import { set } from 'react-hook-form'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('No esta declarado el contexto')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            setUser(res.data)
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            setIsAuth(true)
            setUser(res.data)
        } catch (error) {
            (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
        }
    }

    const logout = async () => {
        try {
            const res = await logoutRequest()
            if (res.status === 200) {
                Cookies.remove('token')
                setIsAuth(null)
                setUser(null)
            }
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()
            if (!cookies.token) {
                setIsAuth(false)
                setUser(null)
                setLoading(false)
                return
            }
            try {
                const res = await verifyToken(cookies.token)
                if (!res.data) {
                    setIsAuth(false)
                    setLoading(false)
                    return
                }
                //Si existe un usuario y se guarda
                setIsAuth(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                setIsAuth(false)
                setUser(null)
                setLoading(false)
                //console.log(error.response.data);
            }
        }
        checkLogin()
    }, [])

    return (
        <AuthContext.Provider value={{ user, signup, signin, isAuth, errors, loading, logout }}>{children}
        </AuthContext.Provider>
    )
}
