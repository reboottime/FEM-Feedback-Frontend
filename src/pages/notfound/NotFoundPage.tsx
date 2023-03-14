import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import YouAreLost from '@/components/YouAreLost';

import { useIsMobile } from '@/hooks/mediaQueries';

import './style.scss';

export const NotFoundPage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/feedbacks');
  };

  return (
    <div className="lost-page flex-center-between">
      <YouAreLost className="lost-page__lost">
        <Button
          onClick={handleButtonClick}
          small={isMobile}
          variant='blue'
        >Go home</Button>
      </YouAreLost>
    </div>
  );
};
