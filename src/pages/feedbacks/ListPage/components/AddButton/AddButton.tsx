import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContextType, useAuthContext } from '@/components/AppProviders';
import Button from '@/components/Button';

export const AddButton: React.FC = () => {
  const { user } = useAuthContext() as AuthContextType;

  const handleButtonClick = () => {
    if (!user) {
      toast.info('You need to sign first before adding feedback');
    }
  };

  return (
    <Link to="/feedbacks/add">
      <Button onClick={handleButtonClick}>+ Add Feedback</Button>
    </Link>
  );
};