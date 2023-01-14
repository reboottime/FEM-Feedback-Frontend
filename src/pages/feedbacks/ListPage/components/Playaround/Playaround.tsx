import React from 'react';
import { toast } from 'react-toastify';

import { ADMIN_PASS, USER_PASS } from './constants';
import { useSignInUser, useSignOutUser } from '@/hooks/queries/users';

import './style.scss';

export const Playaround = () => {
  const signOutMutation = useSignOutUser();
  const signInMutation = useSignInUser();

  const handleSignInButtonClick = async (role: 'admin' | 'user') => {
    await signOutMutation.mutateAsync();

    let user;

    if (role === 'admin') {
      user = await signInMutation.mutateAsync(ADMIN_PASS);
    } else if (role === 'user') {
      user = await signInMutation.mutateAsync(USER_PASS);
    }

    if (user) {
      toast.info(`Signed as ${role} user`);
    }
  };

  return (
    <div className='playaround border-rounded--large'>
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
