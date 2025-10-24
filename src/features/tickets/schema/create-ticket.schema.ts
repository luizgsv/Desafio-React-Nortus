import { z } from 'zod';

export const createTicketSchema = z.object({
  clientName: z.string().min(2, 'Informe pelo menos 2 caracteres'),
  email: z.string().email('Informe um e-mail válido'),
  priority: z.enum(['Urgente', 'Média', 'Baixa']),
  responsible: z.string().min(2, 'Informe pelo menos 2 caracteres'),
  subject: z
    .string()
    .min(5, 'Informe pelo menos 5 caracteres')
    .max(300, 'Máximo de 300 caracteres'),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
