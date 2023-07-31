import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

function ProtectedRoute() {

    const { loading, isAuth } = useAuth()

    if (loading) return <div>Cargando...</div>
    if (!isAuth) return <Navigate to="/login" replace />
    return (
        <Outlet />
    )
}

export default ProtectedRoute