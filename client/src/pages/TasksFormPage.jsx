import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

function TasksFormPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const { createTask, getTask, updateTask, errors: TasksErrors } = useTasks()

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id)
        setValue('title', task.title)
        setValue('description', task.description)
        setValue('date', dayjs(task.date).format('YYYY-MM-DD'))
      }
    }
    loadTask()
  }, [])

  const onSubmit = handleSubmit((values) => {
    if (!values.date) values.date = dayjs().utc().format()
    if (params.id) {
      updateTask(params.id, { ...values, date: dayjs(values.date).utc().format() })
    } else {
      createTask({ ...values, date: dayjs(values.date).utc().format() })
    }
    navigate('/tasks')
  })
  return (
    <div className='flex h-[calc(100vh-50px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        {
          TasksErrors ? TasksErrors.map((error, index) => (
            <p key={index} className='bg-red-500 mb-2 text-white p-2'>{error}</p>
          )) : null
        }
        <form onSubmit={onSubmit} className='flex flex-col justify-between gap-2 items-start'>
          <label htmlFor="title">Titulo</label>
          <input type="text" name='title' placeholder="Titulo" {...register("title", { required: true })} autoFocus className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md' />
          {
            errors.title && <p className='text-red-500'>El titulo es requerido</p>
          }
          <label htmlFor="description">Descripcion</label>
          <textarea placeholder="Descripcion" name='description' {...register("description", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md'></textarea>
          {
            errors.description && <p className='text-red-500'>La descripcion es requerida</p>
          }
          <label htmlFor="date">Fecha</label>
          <input type="date" className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md' {...register('date')} />
          <button className='bg-indigo-500 px-3 py-2 rounded-md'>
            Guardar
          </button>
        </form>
      </div>
    </div>
  )
}

export default TasksFormPage