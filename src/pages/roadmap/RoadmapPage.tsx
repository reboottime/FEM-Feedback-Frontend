import React from 'react';

import Goback from '@/components/Goback';

import { AuthContextType, useAuthContext } from '@/components/AppProviders';
import AddButton from '@/components/AddButton';
import UserIcon from '@/components/UserIcon';

import { useIsMobile } from '@/hooks/mediaQueries';

import './style.scss';

export const RoadmapPage = () => {
  const { user } = useAuthContext() as AuthContextType;
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
    </div>
  );
};
