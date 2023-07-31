import { con } from '../db.js';
import Task from '../models/task_model.js'

export const getTaks = async (req, res) => {
    try {
        const [tasks] = await con.query("SELECT * FROM tasks WHERE user_id = ?", req.user.id);
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getTask = async (req, res) => {
    try {
        const { id } = req.params
        const [task] = await con.query("SELECT * FROM tasks WHERE id = ? AND user_id = ?", [id, req.user.id]);
        //Si el arreglo de task es diferente de 0
        if (task.length === 0) return res.status(404).json({ message: "Tarea no encontrada" })
        res.json(task[0])
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const createTask = async (req, res) => {
    try {
        const { title, description, date } = req.body
        const newTask = new Task(title, description, req.user.id,date)
        const [taskSaved] = await con.query("INSERT INTO tasks SET ?", newTask)
        res.json({ id: taskSaved.insertId, ...newTask })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        const [task] = await con.query("SELECT * FROM tasks WHERE id = ? AND user_id = ?", [id, req.user.id]);
        if (task.length === 0) return res.status(404).json({ message: "Tarea no encontrada" })
        await con.query("DELETE FROM tasks WHERE id = ?", id);
        res.json({ message: "Tarea eliminada" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body
        const [task] = await con.query("SELECT * FROM tasks WHERE id = ? AND user_id = ?", [id, req.user.id]);
        if (task.length === 0) return res.status(404).json({ message: "Tarea no encontrada" })
        const updatedTask = { title, description }
        await con.query("UPDATE tasks SET ? WHERE id = ?", [req.body, id]);
        res.json({ message: "Tarea actualizada", ...updatedTask })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
