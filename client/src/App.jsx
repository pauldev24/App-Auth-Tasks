import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider } from './context/AuthContext'
import TasksPage from './pages/TasksPage'
import TasksFormPage from './pages/TasksFormPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './ProtectedRoute'
import { TasksProvider } from './context/TasksContext'
import ProtectedPublicRoute from './ProtectedPublicRoute'
import Navbar from './components/Navbar'

function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <main className='container mx-auto px-10'>
          <Navbar />
          <TasksProvider>
            <Routes>
              <Route element={<ProtectedPublicRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path='/login' element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TasksFormPage />} />
                <Route path="/tasks/:id" element={<TasksFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </TasksProvider>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
