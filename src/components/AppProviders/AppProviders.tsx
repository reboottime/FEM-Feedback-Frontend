import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { queryClient } from './queryClient';

import AuthProvider from './AuthProvider';

const AppProviders: React.FC<Props> = ({ children }) => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <React.Fragment>
        <BrowserRouter>{children}</BrowserRouter>
        <ToastContainer
          autoClose={500}
          closeOnClick
          position="top-right"
          theme="light"
        />
      </React.Fragment>
    </QueryClientProvider>
  </AuthProvider>
);

interface Props {
  children: React.ReactElement;
}

export default AppProviders;
