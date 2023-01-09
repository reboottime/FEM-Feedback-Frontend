import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthContext, AuthContextType } from './AuthProvider';

export const ProtectedRoute: React.FC<Props> = ({ toPath, children }) => {
  const { user } = useAuthContext() as AuthContextType;

  if (user) {
    return children;
  }

  return (
    <Navigate
      replace
      to={toPath}
    />
  );
};

export interface Props {
  children: React.ReactElement;
  toPath: string;
}
