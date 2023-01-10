import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import RequireAuth from '@/components/RequireAuth';

export const AddButton: React.FC<Props> = ({ children, small }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/feedbacks/add');
  };

  return (
    <RequireAuth actionName="onClick">
      <Button onClick={handleButtonClick}
        small={small}>
        {children}
      </Button>
    </RequireAuth>
  );
};

interface Props {
  children: string;
  small?: boolean;
}
