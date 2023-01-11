import React from 'react';
import { Navigate } from 'react-router-dom';

import { useGetCurrentUser } from '@/hooks/queries/users';

export const ProtectedRoute: React.FC<Props> = ({ toPath, children }) => {
  const {
    data: user,
    isSuccess,
    isError
  } = useGetCurrentUser();

  if (isSuccess && user) {
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

export interface Props {
  children: React.ReactElement;
  toPath: string;
}
