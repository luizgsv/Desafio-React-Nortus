import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';
import { toast } from 'sonner';
import { TicketResponse } from '../models/tickets-response';

export const getAllTicketsData = async () => {
  try {
    const { data } = await api.get<TicketResponse>(endpoints.tickets.list);
    return data;
  } catch (error) {
    toast.error('Erro ao carregar dados de tickets');
    console.log(error);
  }
};
