import classNames from 'classnames';
import React from 'react';

import { ADMIN_PASS, USER_PASS } from './constants';
import { useSignInUser, useSignOutUser } from '@/hooks/queries/users';


import './style.scss';

export const Playaround: React.FC<Props> = ({ className }) => {
  const signOutMutation = useSignOutUser();
  const signInMutation = useSignInUser();

  const handleSignInButtonClick = async (role: 'admin' | 'user') => {
    await signOutMutation.mutateAsync();

    if (role === 'admin') {
      signInMutation.mutate(ADMIN_PASS);
    } else if (role === 'user') {
      signInMutation.mutate(USER_PASS);
    }
  };

  return (
    <div className={classNames('playaround border-rounded--large', className)}>
      <div className="playaround__title">
        <h3 className="typography-heading-3">Play around</h3>
      </div>
      <ul>
        <li>
          <button
            className="playaround__sign-in typography-body-3 fw-semi-bold"
            onClick={() => handleSignInButtonClick('user')}
          >
            Sign in as user
          </button>
        </li>
        <li>
          <button
            className="playaround__sign-in typography-body-3 fw-semi-bold"
            onClick={() => handleSignInButtonClick('admin')}
          >
            Sign in as admin
          </button>
        </li>
      </ul>
    </div>
  );
};
