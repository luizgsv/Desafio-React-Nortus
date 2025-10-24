'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '../hook/use-login';
import { loginSchema, LoginSchema } from '../schema/login.schema';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { remember: false },
  });

  const login = useLogin();

  const onSubmit = () => {
    login.mutate();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-md mt-12 ">
      <fieldset>
        <h2 className="text-2xl font-semibold text-primary mb-1">Login</h2>
        <p className="text-muted-foreground text-sm">
          Entre com suas credenciais para acessar a sua conta.
        </p>
      </fieldset>
      <fieldset className="flex flex-col gap-1">
        <Label htmlFor="user">Usuário</Label>
        <Input
          id="user"
          placeholder="Insira o seu e-mail, CPF ou passaporte"
          {...register('email')}
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
      </fieldset>
      <fieldset className="flex flex-col gap-1">
        <Label htmlFor="password">Senha</Label>
        <fieldset className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Digite sua senha"
            {...register('password')}
            className="p-4"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="bg-transparent absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </fieldset>
        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
      </fieldset>
      <fieldset className="flex items-center justify-between text-sm">
        <Checkbox {...register('remember')} checked={watch('remember')} label="Lembrar-me" />
        <Link
          href="#"
          className="text-accent hover:underline hover:text-accent/90 transition-colors"
        >
          Esqueci minha senha
        </Link>
      </fieldset>
      <Button
        type="submit"
        disabled={login.isPending}
        className=" cursor-pointer w-full h-12 mt-2 rounded-lg bg-accent text-white font-medium hover:bg-accent/80 transition-all"
      >
        {login.isPending ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  );
}
