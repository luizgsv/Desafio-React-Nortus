'use server';

import { cookies } from 'next/headers';

const TOKEN_KEY = process.env.AUTH_TOKEN_KEY || 'auth_token';

export async function setAuthToken(token: string) {
  (await cookies()).set(TOKEN_KEY, token, {
    path: '/',
    httpOnly: false, // se quiser ler no client também
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 dia
  });
}

export async function getAuthToken(): Promise<string | undefined> {
  return (await cookies()).get(TOKEN_KEY)?.value;
}

export async function clearAuthToken() {
  (await cookies()).delete(TOKEN_KEY);
}
