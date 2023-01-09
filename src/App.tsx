import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import authRoutes from '@/pages/auth';
import feedbackRoutes from '@/pages/feedbacks';
import Roadmap from '@/pages/roadmap';

import { useGetCurrentUser } from '@/hooks/queries/users';

const App: React.FC = () => {
  useGetCurrentUser();

  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/feedbacks" />,
    },
    {
      path: '/feedbacks',
      children: feedbackRoutes,
    },
    {
      path: '/auth',
      children: authRoutes,
    },
    {
      path: '/roadmap',
      element: <Roadmap />,
    },
    {
      path: '*',
      element: <h1>Not found</h1>,
    },
  ]);
};

export default App;
