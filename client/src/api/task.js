import axios from './axios'

export const getTasks = () => axios.get(`tasks`);

export const getTask = (id) => axios.get(`tasks/${id}}`);

export const createTask = (task) => axios.post(`tasks`, task);

export const updapteTask = (id,task) => axios.put(`tasks/${id}`, task);

export const deleteTask = (id) => axios.delete(`tasks/${id}`);