import React from 'react';
import { Navigate } from 'react-router-dom';

import { PAGE_INFO_MAP } from './constants';

import AuthForm, { AuthFormProps } from '@/components/AuthForm';
import { AuthContextType, useAuthContext } from '@/components/AppProviders';
import Button from '@/components/Button';

import './style.scss';

export const AuthPage: React.FC<Omit<AuthFormProps, 'children'>> = ({ onSubmit, type }) => {
  const { user } = useAuthContext() as AuthContextType;

  if (user) {
    return (
      <Navigate
        replace
        to="/feedbacks"
      />);
  }

  const { title, reminderText } = PAGE_INFO_MAP[type];

  return (
    <div className="auth-page">
      <div className="auth-page__content border-rounded--large">
        <header className="auth-page__header">
          <h1 className="typography-heading-3">{title}</h1>
          <p className='auth-page__reminder-text'>{reminderText}</p>
        </header>
        <AuthForm
          onSubmit={onSubmit}
          type={type}
        >
          <Button>{title}</Button>
        </AuthForm>
      </div>
    </div>
  );
};
