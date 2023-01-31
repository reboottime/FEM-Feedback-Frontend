import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './i18n';

import AppProvider from '@/components/AppProviders';

import '@/sass/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </AppProvider>
  </React.StrictMode>
);
