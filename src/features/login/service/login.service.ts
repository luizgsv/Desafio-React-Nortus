import { api } from '@/lib/api/axios';
import { endpoints } from '@/lib/api/endpoints';

export const authService = {
  async login() {
    const { data } = await api.get(endpoints.auth.login);
    return {
      token: data.data.accessToken,
      username: data.data.username,
    };
  },
};
