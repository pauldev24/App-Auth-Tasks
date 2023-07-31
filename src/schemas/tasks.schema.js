import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string({
        required_error: 'El título es requerido'
    }),
    description: z.string({
        required_error: 'La descripción es requerida'
    }),
    date: z.string().datetime().optional().nullable(),
});

export const updateTaskSchema = z.object({
    title: z.string({
        required_error: 'El título es requerido'
    }),
    description: z.string({
        required_error: 'La descripción es requerida'
    }).optional(),
    date: z.string().datetime().optional(),
});

