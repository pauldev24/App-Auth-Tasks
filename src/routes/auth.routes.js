import { Router } from "express";
import { login, logout, profile, register, verifyToken } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const authRoutes = Router()

authRoutes.post('/register', validateSchema(registerSchema), register)
authRoutes.post('/login', validateSchema(loginSchema), login)
authRoutes.post('/logout', logout)
authRoutes.get('/profile', authRequired, profile)
authRoutes.get('/verify', verifyToken)

export default authRoutes