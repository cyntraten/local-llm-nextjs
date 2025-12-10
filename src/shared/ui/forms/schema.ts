import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, { error: "Password requires minimum 6 symbols" });

export const loginSchema = z.object({
  email: z.email({ error: "Please type correct email" }),
  password: passwordSchema,
});

export const registerSchema = loginSchema
  .extend({
    userName: z.string().min(3, { error: "Name requires minimum 3 symbols" }),
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords not match",
    path: ["confirmPassword"],
  });

export const profileSettingsSchema = z.object({
  temperature: z.number().min(0).max(1),
  systemPrompt: z.string(),
});

export type TLoginValues = z.infer<typeof loginSchema>;
export type TRegisterValues = z.infer<typeof registerSchema>;
export type TProfileSettings = z.infer<typeof profileSettingsSchema>;
