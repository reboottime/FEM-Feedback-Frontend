import React from 'react';

import LazyWrap from '@/components/LazyWrap';
import { ProtectedRoute } from '@/components/AppProviders';

const AddPage = React.lazy(() => import('./AddPage'));
const EditPage = React.lazy(() => import('./EditPage'));
const DetailPage = React.lazy(() => import('./DetailPage'));
const ListPage = React.lazy(() => import('./ListPage'));

const routes = [
  {
    path: '',
    index: true,
    element: (
      <LazyWrap>
        <ListPage />
      </LazyWrap>
    ),
  },
  {
    path: ':feedbackId',
    element: (
      <LazyWrap>
        <DetailPage />
      </LazyWrap>
    ),
  },
  {
    path: ':feedbackId/edit',
    element: (
      <LazyWrap>
        <ProtectedRoute toPath="/auth">
          <EditPage />
        </ProtectedRoute>
      </LazyWrap>
    ),
  },
  {
    path: 'add',
    element: (
      <LazyWrap>
        <ProtectedRoute toPath="/auth">
          <AddPage />
        </ProtectedRoute>
      </LazyWrap>
    ),
  },
];

export default routes;
