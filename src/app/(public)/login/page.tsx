import { LoginExtras } from '@/features/login/components/login-extras';
import { LoginForm } from '@/features/login/components/login-form';
import { LoginHeader } from '@/features/login/components/login-header';
import { LoginIllustration } from '@/features/login/components/login-illustration';

export default function LoginPage() {
  return (
    <main className="min-h-screen max-w-screen flex bg-background text-foreground p-16">
      <section className="flex flex-col w-1/2">
        <LoginHeader />
        <LoginForm />
      </section>

      <section className="relative flex-1 w-1/2 bg-secondary flex items-center justify-center p-8 rounded-4xl overflow-hidden">
        <LoginExtras />
        <LoginIllustration />
      </section>
    </main>
  );
}
