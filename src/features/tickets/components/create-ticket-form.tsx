'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateTicketInput, createTicketSchema } from '../schema/create-ticket.schema';
import { useTicketsStore } from '../store/tickets.store';

type Props = {
  onSuccess?: () => void;
};

export function CreateTicketForm({ onSuccess }: Props) {
  const addTicket = useTicketsStore((state) => state.addTicket);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreateTicketInput>({
    resolver: zodResolver(createTicketSchema),
  });

  const onSubmit = handleSubmit((values) => {
    addTicket({
      client: values.clientName,
      email: values.email,
      priority: values.priority,
      responsible: values.responsible,
      subject: values.subject,
    });
    reset();
    onSuccess?.();
  });

  const selectedPriority = watch('priority');

  const fieldBase =
    'bg-secondary text-foreground placeholder:text-muted-foreground/70 border border-border focus:ring-1 focus:ring-accent transition-all rounded-full';

  const errorText = 'text-[11px] text-rose-400 font-medium leading-tight min-h-[16px] mt-0.5';

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3" id="add-ticket">
      {/* Nome do Cliente */}
      <div className="flex flex-col">
        <Label htmlFor="clientName" className="text-sm font-medium text-primary mb-1">
          Nome do cliente
        </Label>
        <Input
          id="clientName"
          placeholder="Nome da pessoa ou empresa que está solicitando o suporte"
          {...register('clientName')}
          className={fieldBase}
        />
        <span className={errorText}>{errors.clientName?.message || ''}</span>
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <Label htmlFor="email" className="text-sm font-medium text-primary mb-1">
          Email
        </Label>
        <Input
          id="email"
          placeholder="E-mail de contato para atualizações e resposta"
          {...register('email')}
          className={fieldBase}
        />
        <span className={errorText}>{errors.email?.message || ''}</span>
      </div>

      {/* Prioridade */}
      <div className="flex flex-col">
        <Label htmlFor="priority" className="text-sm font-medium text-primary mb-1">
          Prioridade
        </Label>
        <Select
          value={selectedPriority}
          onValueChange={(value) =>
            setValue('priority', value as CreateTicketInput['priority'], {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger className={cn(fieldBase, 'rounded-full')}>
            <SelectValue placeholder="Selecione o nível de urgência do atendimento" />
          </SelectTrigger>
          <SelectContent className="bg-secondary text-foreground rounded-lg border border-border shadow-md">
            {['Urgente', 'Média', 'Baixa'].map((priority) => (
              <SelectItem key={priority} value={priority}>
                {priority}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className={errorText}>{errors.priority?.message || ''}</span>
      </div>

      {/* Responsável */}
      <div className="flex flex-col">
        <Label htmlFor="responsible" className="text-sm font-medium text-primary mb-1">
          Responsável
        </Label>
        <Input
          id="responsible"
          placeholder="Quem será o responsável por esse ticket"
          {...register('responsible')}
          className={fieldBase}
        />
        <span className={errorText}>{errors.responsible?.message || ''}</span>
      </div>

      {/* Assunto */}
      <div className="flex flex-col">
        <Label htmlFor="subject" className="text-sm font-medium text-primary mb-1">
          Assunto
        </Label>
        <textarea
          id="subject"
          placeholder="Resumo breve do problema ou solicitação"
          {...register('subject')}
          className={cn(fieldBase, 'min-h-[100px] resize-none rounded-xl px-4 py-3 text-sm')}
        />
        <span className={errorText}>{errors.subject?.message || ''}</span>
      </div>
    </form>
  );
}
