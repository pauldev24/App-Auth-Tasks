import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

function ProtectedPublicRoute() {

    const { loading, isAuth } = useAuth()

    if (loading) return <div>Cargando...</div>
    if (isAuth) return <Navigate to="/tasks" replace />
    return (
        <Outlet />
    )
}

export default ProtectedPublicRoute