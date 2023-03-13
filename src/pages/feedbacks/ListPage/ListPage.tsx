import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import Brand from './components/Brand';
import Categories from './components/Categories';
import Feedbacks from './components/Feedbacks';
import Playaround from './components/Playaround';
import Roadmap from './components/Roadmap';
import Sidebar from './components/Sidebar';
import SortAndAdd from './components/SortAndAdd';

import DocumentTitle from '@/components/DocumentTitle';
import Spinner from '@/components/Spinner';

import { useIsMobile } from '@/hooks/mediaQueries';
import { useGetFeedbacks } from '@/hooks/queries/feedbacks';
import { useDebounce } from '@/hooks/useDebounce';

import './style.scss';

export const ListPage = () => {
  const isMobile = useIsMobile();

  const [category, setCategory] = useState<TCategory>('All');
  const [sort, setSort] = useState<TSort>({
    field: 'vote_count',
    order: 'desc',
  });

  const dCategory = useDebounce(category, 500);

  const {
    data: feedbacks,
    isLoading: feedbacksAreLoading,
    isError: feedbacksAreFailed,
    isSuccess: feedbacksAreLoaded,
  } = useGetFeedbacks({
    sort: { [sort.field]: sort.order },
    ...(dCategory === 'All'
      ? {}
      : { category: dCategory }),
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
      <DocumentTitle title='Feedbacks' />
      {isMobile
        ? (
          <Sidebar>
            <Categories
              onCategorySelect={handleCategorySelect}
              selectedCategory={category}
            />
            <Roadmap />
            <Playaround />
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
              <li className='list-page__nav-item'>
                <Playaround />
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
        <div className="list-page__feedbacks">
          {feedbacksAreLoading && <Spinner className="list-page__spinner" />}
          {feedbacksAreFailed && <p>Failed to load</p>}
          {feedbacksAreLoaded && <Feedbacks feedbacks={feedbacks} />}
        </div>
      </main>
    </div>
  );
};

export default ListPage;
