import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import Button from '@/components/Button';
import { Input } from '@/components/Form';

export const AuthForm: React.FC<Props> = ({ onSubmit, children }) => {
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
            description="your username"
            name="username"
            required={{
              value: true,
              message: 'User name is required',
            }}
            title="User name"
          />
          <Input
            description="your password"
            name="password"
            required={{
              value: true,
              message: 'Password is required',
            }}
            title="Password"
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
