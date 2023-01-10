import classsNames from 'classnames';
import React, { useState } from 'react';

import Categories from './components/Categories';
import Feedbacks from './components/Feedbacks';
import Roadmap from './components/Roadmap';
import Sidebar from './components/Sidebar';
import SortAndAdd from './components/SortAndAdd';

import Navigation from './components/Navigation';
import Brand from './components/Brand';
import { useIsMobile } from '@/hooks/mediaQueries';
import { useGetFeedbacks } from '@/hooks/queries/feedbacks';

import './style.scss';

export const ListPage = () => {
  const isMobile = useIsMobile();

  const {
    data: feedbacks,
    isError: isFeedbacksError,
    isLoading: isFeedbacksLoading,
    isSuccess: isFeedbacksLoaded,
  } = useGetFeedbacks();

  const [category, setCategory] = useState<TCategory>('All');
  const [sort, setSort] = useState<TSort>({
    field: 'vote_count',
    order: 'desc',
  });

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
            <Roadmap />
            <Categories
              onCategorySelect={handleCategorySelect}
              selectedCategory={category}
            />
          </Sidebar>
        )
        : (
          <Navigation>
            <Brand />
            <Roadmap />
            <Categories
              onCategorySelect={handleCategorySelect}
              selectedCategory={category}
            />
          </Navigation>
        )}
      <main
        className={classsNames('list-page__main', {
          'list-page__main--mobile': isMobile,
        })}
      >
        <SortAndAdd
          onSort={handleSort}
          sort={sort}
          stats={{
            isLoading: isFeedbacksLoading,
            count: (feedbacks as unknown as Entities.Feedback.TFeedback[])
              ?.length,
          }}
        />
        {isFeedbacksLoading && <p>Loading...</p>}
        {isFeedbacksError && <p>Failed to load</p>}
        {isFeedbacksLoaded && (
          <Feedbacks
            feedbacks={feedbacks as unknown as Entities.Feedback.TFeedback[]}
          />
        )}
      </main>
    </div>
  );
};

export default ListPage;
