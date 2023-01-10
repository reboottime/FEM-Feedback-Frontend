import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContextType, useAuthContext } from '@/components/AppProviders';
import Button from '@/components/Button';

import { useIsMobile } from '@/hooks/mediaQueries';

export const AddButton: React.FC = () => {
  const isMobile = useIsMobile();
  const { user } = useAuthContext() as AuthContextType;

  const handleButtonClick = () => {
    if (!user) {
      toast.info('You need to sign first before adding feedback');
    }
  };

  return (
    <Link to="/feedbacks/add">
      <Button
        onClick={handleButtonClick}
        small={isMobile}
      >+ Add Feedback</Button>
    </Link>
  );
};
