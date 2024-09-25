import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      router.push('/dashboard');
    }
  }, [router]);
};
