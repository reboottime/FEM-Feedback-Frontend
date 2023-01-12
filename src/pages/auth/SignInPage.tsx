import React from 'react';
import { useNavigate } from 'react-router-dom';

import AuthPage from './components/AuthPage';

import { useSignInUser } from '@/hooks/queries/users';

export const SignInPage = () => {
  const navigate = useNavigate();
  const mutation = useSignInUser();

  const onSubmit = async (data: TUserPass) => {
    await mutation.mutateAsync(data);

    navigate('/feedbacks');
  };

  return (
    <AuthPage
      onSubmit={onSubmit}
      type="signIn"
    />
  );
};

export default SignInPage;
