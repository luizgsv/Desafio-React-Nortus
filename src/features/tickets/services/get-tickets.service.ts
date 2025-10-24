import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';
import { TicketResponse } from '../models/tickets-response';

export const getAllTicketsData = async () => {
  try {
    const { data } = await api.get<TicketResponse>(endpoints.tickets.list);
    return data;
  } catch (error) {
    console.log(error);
  }
};
