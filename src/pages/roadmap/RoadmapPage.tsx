import React from 'react';

import { KanbanMobileLayout, KanbanTabletLayout } from './components/Kanban';

import AddButton from '@/components/AddButton';
import { useAuthContext } from '@/components/AppProviders';
import Goback from '@/components/Goback';
import ToHome from '@/components/ToHome';
import UserIcon from '@/components/UserIcon';

import { useIsMobile } from '@/hooks/mediaQueries';

import './style.scss';

export const RoadmapPage = () => {
  const { user } = useAuthContext();

  const isMobile = useIsMobile();

  const addButtonText = isMobile
    ? '+ Feedback'
    : '+ Add Feedback';

  return (
    <div className="roadmap-page">
      <header className="roadmap-page__header flex-center-between">
        <div>
          <Goback variant="white" />
          <h1 className="fw-bold roadmap-page__title">Roadmap</h1>
        </div>
        <div className="roadmap-page__actions">
          <AddButton small={isMobile}>{addButtonText}</AddButton>
          {user && <UserIcon />}
          <ToHome />
        </div>
      </header>
      <main className="roadmap-page__main">
        {isMobile
          ? <KanbanMobileLayout />
          : <KanbanTabletLayout />}
      </main>
    </div>
  );
};
