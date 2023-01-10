import classNames from 'classnames';
import React from 'react';

import { SORT_OPTIONS } from './constants';
import Select from './Select';

import { ReactComponent as BulbIcon } from '@/assets/shared/icon-bulb.svg';

import UserIcon from '@/components/UserIcon';
import AddButton from '@/pages/feedbacks/ListPage/components/AddButton';

import { useIsMobile } from '@/hooks/mediaQueries';

import './style.scss';

export const SortAndAdd: React.FC<Props> = ({
  className,
  onSort,
  sort,
  stats,
}) => {
  const isMobile = useIsMobile();
  const isNotMobile = !isMobile;

  const handleSelect = (value: string) => {
    const [field, order] = value.split(':');

    onSort({
      field,
      order: order as TSort['order'],
    });
  };

  return (
    <div
      className={classNames('sort-and-add', className, {
        'border-rounded--large': isNotMobile,
      })}
    >
      <div className="sort-and-add__sort">
        {isNotMobile && (
          <div className="sort-and-add__stats">
            <BulbIcon />
            <h3 className="typograph-heading-3 fw-bold">
              {stats.isLoading
                ? <span>loading...</span>
                : <React.Fragment>{stats.count} Suggestions</React.Fragment>
              }
            </h3>
          </div>
        )}
        <div className="sort-and-add__select">
          <span className='fw-regular'>Sort by: </span>
          <Select
            onSelect={handleSelect}
            options={SORT_OPTIONS}
            value={`${sort.field}:${sort.order}`}
          />
        </div>
      </div>
      <div className="sort-and-add__operations">
        <AddButton small={isMobile}>+ feedback</AddButton>
        <UserIcon />
      </div>
    </div >
  );
};

interface Props {
  className?: string;
  onSort: (newSort: TSort) => void;
  sort: TSort;
  stats: {
    count: number;
    isLoading: boolean;
  }
}
