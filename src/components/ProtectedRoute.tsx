import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthContext } from './AppProviders';

import { useGetCurrentUser } from '@/hooks/queries/users';

const ProtectedRoute: React.FC<Props> = ({ toPath, children }) => {
  const { user } = useAuthContext();
  const {
    isSuccess,
    isError
  } = useGetCurrentUser();

  if (user || isSuccess) {
    return children;
  }

  if (isError) {
    return (
      <Navigate
        replace
        to={toPath}
      />
    );
  }

  return null;
};

export default ProtectedRoute;

export interface Props {
  children: React.ReactElement;
  toPath: string;
}
