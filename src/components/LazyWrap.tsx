import React from 'react';

const LazyWrap: React.FC<Props> = ({ children }) => (
  <React.Suspense fallback={null}>{children}</React.Suspense>
);

interface Props {
  children: React.ReactElement;
}

export default LazyWrap;
