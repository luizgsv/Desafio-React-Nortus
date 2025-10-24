import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';
import { MapResponse } from '../models/types/response-map';

export const getAllMapData = async () => {
  try {
    const { data } = await api.get<MapResponse>(endpoints.dashboard.map);
    return data;
  } catch (error) {
    console.log(error);
  }
};
