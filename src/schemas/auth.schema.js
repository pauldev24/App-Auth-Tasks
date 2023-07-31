import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'El nombre de usuario es requerido'
    }),
    email: z.string({
        required_error: 'El correo es requerido'
    }).email({
        message: 'No es un formato de correo válido'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(6, {
        message: 'Se requiere una contraseña de al menos 6 caracteres'
    }),
});

export const loginSchema = z.object({
    email: z.string({
        required_error: 'El correo es requerido'
    }).email({
        message: 'No es un formato de correo válido'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(6, {
        message: 'Se requiere una contraseña de al menos 6 caracteres'
    }),
});