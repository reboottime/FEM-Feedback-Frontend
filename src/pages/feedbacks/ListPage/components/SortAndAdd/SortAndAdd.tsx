import React from 'react';

import './style.scss';

export const SortAndAdd: React.FC<Props> = () => {
  return (
    <div
      className={'sort-and-add'}
    ></div>
  );
};

interface Props {
  onSort: (sort: TSort) => void;
  sort: TSort;
}
