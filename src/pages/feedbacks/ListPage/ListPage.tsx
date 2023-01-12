import classNames from 'classnames';
import React, { useState } from 'react';

import Brand from './components/Brand';
import Categories from './components/Categories';
import Feedbacks from './components/Feedbacks';
import Roadmap from './components/Roadmap';
import Sidebar from './components/Sidebar';
import SortAndAdd from './components/SortAndAdd';

import { useIsMobile } from '@/hooks/mediaQueries';
import { useGetFeedbacks } from '@/hooks/queries/feedbacks';

import './style.scss';

export const ListPage = () => {
  const isMobile = useIsMobile();

  const [category, setCategory] = useState<TCategory>('All');
  const [sort, setSort] = useState<TSort>({
    field: 'vote_count',
    order: 'desc',
  });

  const {
    data: feedbacks,
    isError: feedbacksAreFailed,
    isSuccess: feedbacksAreLoaded,
  } = useGetFeedbacks({
    sort: { [sort.field]: sort.order },
    ...(category === 'All')
      ? {}
      : { category }
  } as TQueryParams);


  const handleCategorySelect = (category: TCategory) => {
    setCategory(category);
  };

  const handleSort = (newSort: TSort) => {
    setSort(newSort);
  };

  return (
    <div className="list-page">
      {isMobile
        ? (
          <Sidebar>
            <Categories
              onCategorySelect={handleCategorySelect}
              selectedCategory={category}
            />
            <Roadmap />
          </Sidebar>
        )
        : (
          <nav className="list-page__nav">
            <ul className="list-page__nav-items">
              <li className="list-page__nav-item">
                <Brand />
              </li>
              <li className="list-page__nav-item">
                <Categories
                  onCategorySelect={handleCategorySelect}
                  selectedCategory={category}
                />
              </li>
              <li className="list-page__nav-item">
                <Roadmap />
              </li>
            </ul>
          </nav>
        )}
      <main
        className={classNames('list-page__main', {
          'list-page__main--mobile': isMobile,
        })}
      >
        <SortAndAdd
          onSort={handleSort}
          sort={sort}
          stats={{
            isReady: feedbacksAreLoaded,
            count: feedbacks?.length ?? 0,
          }}
        />
        {feedbacksAreFailed && <p>Failed to load</p>}
        {feedbacksAreLoaded && (
          <Feedbacks feedbacks={feedbacks} />
        )}
      </main>
    </div>
  );
};

export default ListPage;
