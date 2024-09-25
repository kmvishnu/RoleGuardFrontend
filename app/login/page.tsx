import LoginForm from '@/app/ui/login-form';
import RoleGuardLogo from '../ui/roleGuard-icon';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-sky-950 p-3 md:h-36">
          <div className="w-56 text-white md:w-56">
            <RoleGuardLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}