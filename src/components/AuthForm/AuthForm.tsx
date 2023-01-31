import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from '@/components/Button';
import { Input } from '@/components/Form';

export const AuthForm: React.FC<Props> = ({ onSubmit, children }) => {
  const { t } = useTranslation('auth.form');

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      password: '',
      username: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="auth-form">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            description={t('form.username.description')}
            name="username"
            placeholder={t('form.placeholder')}
            required={{
              value: true,
              message: t('form.username.required'),
            }}
            title={t('form.username.title')}
          />
          <Input
            description={t('form.password.description')}
            name="password"
            placeholder={t('form.placeholder')}
            required={{
              value: true,
              message: t('form.password.required'),
            }}
            title={t('form.password.title')}
            type="password"
          />
          {children}
        </form>
      </div>
    </FormProvider>
  );
};

export interface Props {
  children: React.ReactElement<typeof Button>;
  onSubmit: (data: TUserPass) => void;
  type: 'signIn' | 'signUp';
}
