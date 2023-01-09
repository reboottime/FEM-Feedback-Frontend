import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';

export const Cancell = () => {
  const navigate = useNavigate();

  const handleCancellClick = () => {
    navigate(-1);
  };

  return (
    <Button
      mobileFullWidth
      onClick={handleCancellClick}
      type="button"
      variant="indigo"
    >
      Cancell
    </Button>
  );
};
