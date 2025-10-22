'use client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { authService } from '../service/login.service';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || 'auth_token', data.token);
      // document.cookie = `${process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || 'auth_token'}=${data.token}; path=/; max-age=${
      //   60 * 60 * 24
      // }`; // 1 dia
      toast.success('Login realizado com sucesso!');
      router.push('/');
    },
    onError: () => {
      toast.error('Falha ao autenticar. Tente novamente.');
    },
  });
}
