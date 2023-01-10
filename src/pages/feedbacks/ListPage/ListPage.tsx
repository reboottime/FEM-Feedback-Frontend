import classsNames from 'classnames';
import React, { useState } from 'react';

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

  const {
    data: feedbacks,
    isError: isFeedbacksError,
    isLoading: isFeedbacksLoading,
    isSuccess: isFeedbacksLoaded,
  } = useGetFeedbacks();

  const [category, setCategory] = useState<TCategory>('All');

  const handleCategorySelect = (category: TCategory) => {
    setCategory(category);
  };

  return (
    <div className='list-page'>
      {isMobile && (
        <Sidebar>
          {/* The sidebar toggle is in sidebar */}
          <Roadmap />
          <Categories
            onCategorySelect={handleCategorySelect}
            selectedCategory={category}
          />
        </Sidebar>
      )}
      <main className={classsNames('list-page__main', {
        'list-page__main--mobile': isMobile
      })}>
        <SortAndAdd />
        {isFeedbacksLoading && <p>Loading...</p>}
        {isFeedbacksError && <p>Failed to load</p>}
        {isFeedbacksLoaded && <Feedbacks feedbacks={feedbacks as unknown as Entities.Feedback.TFeedback[]} />}
      </main>
    </div>
  );
};

export default ListPage;
