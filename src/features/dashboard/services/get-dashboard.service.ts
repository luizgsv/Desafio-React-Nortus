import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';
import { DashboardResponse } from '../models/types/response-dashboard';
import { toast } from 'sonner';

export const getAllDashboardData = async () => {
  try {
    const { data } = await api.get<DashboardResponse>(endpoints.dashboard.data);
    return data;
  } catch (error) {
    toast.error('Erro ao carregar dados de dashboard');
    console.log(error);
  }
};
