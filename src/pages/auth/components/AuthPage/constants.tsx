import React from 'react';
import { Link } from 'react-router-dom';

import { AuthFormProps } from '@/components/AuthForm';

export const PAGE_INFO_MAP: Record<AuthFormProps['type'], TPageInfo> = {
  signIn: {
    title: 'Sign In',
    reminderText: (
      <>
        Doesn&apos;t have an account,
        <Link to="/auth/sign-up">sign up</Link>.
      </>
    ),
  },
  signUp: {
    title: 'Sign Up',
    reminderText: (
      <>
        Already have an account,  <Link to="/auth/sign-in">sign in</Link>.
      </>
    ),
  },
};


interface TPageInfo {
  reminderText: React.ReactElement;
  title: string;
}
