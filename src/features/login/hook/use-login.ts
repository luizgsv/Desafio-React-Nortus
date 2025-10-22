'use client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { authService } from '../service/login.service';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: async (data) => {
      await fetch('/api/auth/set-cookie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: data.token }),
      });

      localStorage.setItem('user_name', data.username);

      toast.success('Login realizado com sucesso!');
      router.push('/');
    },
    onError: () => {
      toast.error('Falha ao autenticar. Tente novamente.');
    },
  });
}
