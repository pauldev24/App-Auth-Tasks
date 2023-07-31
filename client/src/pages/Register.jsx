import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signup, isAuth, errors: RegisterErrors } = useAuth()
    const navigete = useNavigate()

    const onSubmit = handleSubmit(async (values) => {
        signup(values)
    })

    useEffect(() => {
        if (isAuth) navigete('/tasks')
    }, [isAuth, navigete])


    return (
        <div className='flex h-[calc(100vh-50px)] items-center justify-center'>
            <div className='w-full mx-auto bg-zinc-800 max-w-md p-10 rounded-md'>
                <h1 className="text-2xl font-bold mb-2">Registrate</h1>
                <form className='m-auto' onSubmit={onSubmit}>
                    {
                        RegisterErrors ? RegisterErrors.map((error, index) => (
                            <p key={index} className='bg-red-500 mb-2 text-white p-2'>{error}</p>
                        )) : null
                    }
                    <input type="text" {...register("username", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-2' placeholder='username' />
                    {
                        errors.username && <p className='text-red-500'>Username es requerido</p>
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
                        Register
                    </button>
                </form>

                <p className="flex gap-x-2 justify-between">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-sky-700">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register