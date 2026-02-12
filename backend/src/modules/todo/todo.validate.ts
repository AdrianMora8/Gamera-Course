import z from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1, 'Titulo es requerido').max(100, 'Titulo debe contener como máximo 100 caracteres'),
  description: z.string().min(1, 'Descripcion es requerida').max(500, 'Descripcion debe contener como máximo 500 caracteres'),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1, 'Titulo es requerido').max(100, 'Titulo debe contener como máximo 100 caracteres').optional(),
  description: z.string().min(1, 'Descripcion es requerida').max(500, 'Descripcion debe contener como máximo 500 caracteres').optional(),
  completed: z.boolean().optional(),
});

export const todoIdParamSchema = z.object({
  id: z.string().min(1, 'ID de tarea es requerido'),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;