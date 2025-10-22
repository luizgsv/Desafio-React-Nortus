import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: 'Token é obrigatório' }, { status: 400 });
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set({
    name: process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || 'auth_token',
    value: token,
    httpOnly: true, // protege de XSS
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 dia
    sameSite: 'lax',
  });

  return res;
}
