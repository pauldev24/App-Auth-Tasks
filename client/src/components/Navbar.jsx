import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {

    const { isAuth, user, logout } = useAuth()


    const handleLogout = () => {
        logout()
    }

    return (
        <nav className="bg-zinc-700 mb-3 flex justify-between py-5 px-10">
            <Link to='/'>
                <h1 className="text-2xl font-bold">Menu de Tareas</h1>
            </Link>
            <ul className="flex items-center gap-x-2">
                {
                    isAuth ? (
                        <>
                            {user && <li>Bienvenido {user.username}</li>}
                            <li>
                                <Link to='/add-task' className="bg-green-500 px-4 py-1 rounded-sm">Nueva Tarea</Link>
                            </li>
                            <li>
                                <button className="bg-red-500 px-4 py-1 rounded-sm" onClick={handleLogout}>Logout</button>
                            </li>
                        </>) : (
                        <>
                            <li>
                                <Link to='/login' className="bg-indigo-500 px-4 py-1 rounded-sm">Login</Link>
                            </li>
                            <li>
                                <Link to='/register'>Registrarse</Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </nav>
    )
}

export default Navbar