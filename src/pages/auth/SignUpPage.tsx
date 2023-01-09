import React from 'react';
import { useNavigate } from 'react-router-dom';

import AuthPage from './components/AuthPage';

import { useSignUpUser } from '@/hooks/queries/users';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const mutation = useSignUpUser();

  const onSubmit = async (data: TUserPass) => {
    await mutation.mutateAsync(data as never);

    navigate('/feedbacks');
  };

  return (
    <AuthPage
      onSubmit={onSubmit}
      type="signUp"
    />
  );
};

export default SignUpPage;
