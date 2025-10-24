import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';
import { toast } from 'sonner';
import { MapResponse } from '../models/types/response-map';

export const getAllMapData = async () => {
  try {
    const { data } = await api.get<MapResponse>(endpoints.dashboard.map);
    return data;
  } catch (error) {
    toast.error('Erro ao carregar dados de dashboard');
    console.log(error);
  }
};
