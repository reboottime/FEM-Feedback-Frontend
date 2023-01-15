import React from 'react';
import { Navigate, Link } from 'react-router-dom';

import { PAGE_INFO_MAP } from './constants';

import AuthForm, { AuthFormProps } from '@/components/AuthForm';
import { useAuthContext } from '@/components/AppProviders';
import Button from '@/components/Button';
import DocumentTitle from '@/components/DocumentTitle';

import './style.scss';

export const AuthPage: React.FC<Omit<AuthFormProps, 'children'>> = ({ onSubmit, type }) => {
  const { user } = useAuthContext();

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
      <DocumentTitle title={(type === 'signIn')
        ? 'Sign In'
        : 'Sign Up'} />
      <div className="auth-page__content border-rounded--large">
        <header className="auth-page__header">
          <h1 className="typography-heading-3">{title}
          </h1>
          <p className='auth-page__reminder-text typography-body-2'>{reminderText}</p>
          <p className='auth-page__reminder-text typography-body-2'>
            Just looking  around, click {' '}
            <Link to="/feedbacks">here</Link>.
          </p>
        </header>
        <AuthForm
          onSubmit={onSubmit}
          type={type}
        >
          <p className='auth-page__footer'>
            <Button
              small
              type="submit"
            >{title}</Button>
          </p>
        </AuthForm>
      </div>
    </div>
  );
};
