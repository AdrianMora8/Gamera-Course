import { z } from "zod";

/**
 * Schema de validación para el login de usuario
 * Valida email y contraseña
 */
export const loginSchema = z.object({
  email: z
    .string({
      message: "El email es requerido",
    })
    .email({
      message: "Debe ser un email válido",
    })
    .toLowerCase()
    .trim(),
  password: z
    .string({
      message: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
});

/**
 * Schema de validación para el registro de usuario
 * Valida nombre, apellido, email y contraseña
 */
export const registerSchema = z.object({
  name: z
    .string({
      message: "El nombre es requerido",
    })
    .min(2, {
      message: "El nombre debe tener al menos 2 caracteres",
    })
    .trim(),
  lastName: z
    .string({
      message: "El apellido es requerido",
    })
    .min(2, {
      message: "El apellido debe tener al menos 2 caracteres",
    })
    .trim(),
  email: z
    .string({
      message: "El email es requerido",
    })
    .email({
      message: "Debe ser un email válido",
    })
    .toLowerCase()
    .trim(),
  password: z
    .string({
      message: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    })
    .max(100, {
      message: "La contraseña no puede tener más de 100 caracteres",
    }),
});

/**
 * Tipos inferidos desde los schemas de Zod
 */
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
