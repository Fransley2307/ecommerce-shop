import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

interface PublicRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export function PublicRoute({ children, redirectTo = '/' }: PublicRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="container mx-auto py-10 text-center">
        Carregando...
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    );
  }

  return <>{children}</>;
}
