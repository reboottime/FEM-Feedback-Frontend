import React from 'react';
import { Navigate } from 'react-router-dom';

import LazyWrap from '@/components/LazyWrap';

const SignInPage = React.lazy(() => import('./SignInPage'));
const SignUpPage = React.lazy(() => import('./SignUpPage'));

const routes = [
  {
    path: '',
    index: true,
    element: <Navigate replace
      to="/auth/sign-in" />,
  },
  {
    path: ':sign-in',
    element: (
      <LazyWrap>
        <SignInPage />
      </LazyWrap>
    ),
  },
  {
    path: ':sign-up',
    element: (
      <LazyWrap>
        <SignUpPage />
      </LazyWrap>
    ),
  },
];

export default routes;
