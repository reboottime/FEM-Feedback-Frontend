import React, { useMemo } from 'react';

import Kanban from './components/Kanban';

import AddButton from '@/components/AddButton';
import { AuthContextType, useAuthContext } from '@/components/AppProviders';
import Goback from '@/components/Goback';
import UserIcon from '@/components/UserIcon';

import { useIsMobile } from '@/hooks/mediaQueries';
import { useGetFeedbacks } from '@/hooks/queries/feedbacks';

import './style.scss';

export const RoadmapPage = () => {
  const { user } = useAuthContext() as AuthContextType;

  const {
    data,
    isLoading: isFeedbacksLoading,
    isSuccess: isFeedbacksLoaded
  } = useGetFeedbacks();

  const feedbacks = useMemo(() => {
    if (!data) {
      return [];
    }

    return (data as unknown as Entities.Feedback.TFeedback[]).filter(
      (item) => item.status !== 'new'
    );
  }, [data]);

  const isMobile = useIsMobile();

  const addButtonText = isMobile
    ? '+ Feedback'
    : '+ Add Feedback';

  return (
    <div className="roadmap-page">
      <header className="roadmap-page__header">
        <div className="roadmap-page__header-content">
          <div>
            <Goback variant="white" />
            <h1 className="fw-bold roadmap-page__title">Roadmap</h1>
          </div>
          <div className="roadmap-page__actions">
            <AddButton>{addButtonText}</AddButton>
            {user && <UserIcon />}
          </div>
        </div>
      </header>
      <div className="roadmap-page__main">
        {isFeedbacksLoading && <p>loading...</p>}
        {isFeedbacksLoaded && (
          <Kanban feedbacks={feedbacks as unknown as Entities.Feedback.TFeedback[]} />
        )}
      </div>
    </div>
  );
};
