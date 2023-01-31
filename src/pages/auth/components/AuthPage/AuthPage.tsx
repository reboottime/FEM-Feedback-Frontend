import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AuthForm, { AuthFormProps } from '@/components/AuthForm';
import { useAuthContext } from '@/components/AppProviders';
import Button from '@/components/Button';
import DocumentTitle from '@/components/DocumentTitle';

import './style.scss';

export const AuthPage: React.FC<Omit<AuthFormProps, 'children'>> = ({
  onSubmit,
  type,
}) => {
  const { user } = useAuthContext();
  const { t } = useTranslation('auth.form');

  if (user) {
    return <Navigate replace
      to="/feedbacks" />;
  }

  const title = t(`${type}.title`);

  return (
    <div className="auth-page">
      <DocumentTitle title={title} />
      <div className="auth-page__content border-rounded--large">
        <header className="auth-page__header">
          <h1 className="typography-heading-3">{title}</h1>
          <p className="auth-page__reminder-text typography-body-2">
            {t(`${type}.reminder.text`)}
            {', '}
            <Link to={(type === 'signIn')
              ? '/auth/sign-up'
              : '/auth/sign-in'}>
              {t(`${type}.reminder.action`)}
            </Link>
          </p>
          <p className="auth-page__reminder-text typography-body-2">
            {t('around.text')} <Link to="/feedbacks">{t('around.link')}</Link>.
          </p>
        </header>
        <AuthForm onSubmit={onSubmit}
          type={type}>
          <p className="auth-page__footer">
            <Button small
              type="submit">
              {title}
            </Button>
          </p>
        </AuthForm>
      </div>
    </div >
  );
};
