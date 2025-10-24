'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useLocalStorage } from '@/hooks/local-storage';

export function useLogout() {
  const router = useRouter();
  const { removeItem } = useLocalStorage();

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      removeItem('user_name');

      toast.success('Você saiu da conta.');
      router.push('/login');
    } catch {
      toast.error('Erro ao sair. Tente novamente.');
    }
  };

  return { logout };
}
