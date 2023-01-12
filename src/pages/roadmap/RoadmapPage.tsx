import React, { useMemo } from 'react';

import Kanban from './components/Kanban';

import AddButton from '@/components/AddButton';
import { useAuthContext } from '@/components/AppProviders';
import Goback from '@/components/Goback';
import ToHome from '@/components/ToHome';
import UserIcon from '@/components/UserIcon';

import { useIsMobile } from '@/hooks/mediaQueries';
import { useGetFeedbacks } from '@/hooks/queries/feedbacks';

import './style.scss';

export const RoadmapPage = () => {
  const { user } = useAuthContext();

  const {
    data: feedbacks,
    isLoading: isFeedbacksLoading,
    isSuccess: isFeedbacksLoaded
  } = useGetFeedbacks();

  const roadmapFeedbacks = useMemo(() => {
    if (!feedbacks) {
      return [];
    }

    return feedbacks.filter(
      (item) => item.status !== 'new'
    );
  }, [feedbacks]);

  const isMobile = useIsMobile();

  const addButtonText = isMobile
    ? '+ Feedback'
    : '+ Add Feedback';

  return (
    <div className="roadmap-page">
      <header className="roadmap-page__header">
        <div className="roadmap-page__header-content flex-center-between">
          <div>
            <Goback variant="white" />
            <h1 className="fw-bold roadmap-page__title">Roadmap</h1>
          </div>
          <div className="roadmap-page__actions">
            <AddButton>{addButtonText}</AddButton>
            {user && <UserIcon />}
            <ToHome />
          </div>
        </div>
      </header>
      <div className="roadmap-page__main">
        {isFeedbacksLoading && <p>loading...</p>}
        {isFeedbacksLoaded && (
          <Kanban feedbacks={roadmapFeedbacks} />
        )}
      </div>
    </div>
  );
};
