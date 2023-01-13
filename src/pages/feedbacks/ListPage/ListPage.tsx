import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

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
    isLoading: feedbacksAreLoading,
    isError: feedbacksAreFailed,
    isSuccess: feedbacksAreLoaded,
  } = useGetFeedbacks({
    sort: { [sort.field]: sort.order },
    ...(category === 'All')
      ? {}
      : { category }
  } as TQueryParams);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [feedbacks]);

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
        <div className='list-page__feedbacks'>
          {feedbacksAreLoading && (
            <div className='list-page__spinner'>
              <InfinitySpin
                color="hsl(230 76% 59% / 100%)"
                width='200'
              />
            </div>)}
          {feedbacksAreFailed && <p>Failed to load</p>}
          {feedbacksAreLoaded && (
            <Feedbacks feedbacks={feedbacks} />
          )}
        </div>
      </main>
    </div>
  );
};

export default ListPage;
