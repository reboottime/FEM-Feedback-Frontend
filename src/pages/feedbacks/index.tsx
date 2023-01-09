import React from 'react';

import LazyWrap from '@/components/LazyWrap';

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
        <EditPage />
      </LazyWrap>
    ),
  },
  {
    path: 'add',
    element: (
      <LazyWrap>
        <AddPage />
      </LazyWrap>
    ),
  },
];

export default routes;
