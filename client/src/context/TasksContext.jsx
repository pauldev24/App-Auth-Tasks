import { createContext, useContext, useState } from "react";
import { createTask as createTaskRequest, getTask as getTaskRequest, getTasks as getTasksRequest, deleteTask as deleteTaskRequest, updapteTask as updateTaskRequest } from '../api/task'


const TasksContext = createContext();

export const useTasks = () => {
    const context = useContext(TasksContext);

    if (!context) {
        throw new Error("No esta declarado el contexto");
    }
    return context;
}

export function TasksProvider({ children }) {

    const [tasks, setTasks] = useState([])
    const [errors, setErrors] = useState([])

    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            setTasks(res.data)
        } catch (error) {
            (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
        }
    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id)
            return res.data
        } catch (error) {
            (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
        }
    }

    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task)
            console.log(res)
        } catch (error) {
            (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
        }
    }

    const updateTask = async (id, task) => {
        try {
            await updateTaskRequest(id, task)
        } catch (error) {
            (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id)
            if (res.status === 200) setTasks(tasks.filter(task => task.id !== id))
        } catch (error) {
            (error.response.data.message) ? setErrors([error.response.data.message]) : setErrors(error.response.data)
        }
    }

    return (
        <TasksContext.Provider value={{ tasks, createTask, getTasks, deleteTask, getTask, updateTask, errors}}>
            {children}
        </TasksContext.Provider>
    )
}