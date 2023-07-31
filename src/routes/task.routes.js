import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { createTask, deleteTask, getTaks, updateTask, getTask } from '../controllers/tasks.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../schemas/tasks.schema.js';

const taskrouter = Router()

taskrouter.get('/tasks', authRequired, getTaks);
taskrouter.get('/tasks/:id', authRequired, getTask);
taskrouter.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask);
taskrouter.delete('/tasks/:id', authRequired, deleteTask);
taskrouter.put('/tasks/:id', authRequired, updateTask);

export default taskrouter