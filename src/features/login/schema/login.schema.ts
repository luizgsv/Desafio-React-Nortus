import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .email({
      abort: true,
      error: 'Formato de e-mail inválido.',
    })
    .min(3, 'Informe seu e-mail ou usuário.'),
  password: z.string().min(4, 'Senha muito curta.'),
  remember: z.boolean().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
