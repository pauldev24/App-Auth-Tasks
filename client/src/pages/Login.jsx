import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const { errors: LoginErrors, signin, isAuth } = useAuth()

  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (values) => {
    await signin(values)
  })

  useEffect(() => {
    if (isAuth) return navigate('/tasks')
  }, [isAuth, navigate])

  return (
    <div className='flex h-[calc(100vh-50px)] items-center justify-center'>
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold mb-2">Login</h1>
        <form onSubmit={onSubmit}>
          {
            LoginErrors ? LoginErrors.map((error, index) => (
              <p key={index} className='bg-red-500 mb-2 text-white p-2'>{error}</p>
            )) : null
          }
          <input type="email" {...register("email", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-2' placeholder='email' />
          {
            errors.email && <p className='text-red-500'>Email es requerido</p>
          }
          <input type="password" {...register("password", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-2' placeholder='password' />
          {
            errors.password && <p className='text-red-500'>Password es requerido</p>
          }
          <button className='bg-sky-600 px-4 py-2 rounded-md' type='submit'>
            Login
          </button>
        </form>

        <p className="flex gap-x-2 justify-between">
          ¿No tienes cuenta, registrate? <Link to="/register" className="text-sky-700">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
