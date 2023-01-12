import classNames from 'classnames';
import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import OutsideClickHandler from 'react-outside-click-handler';

import { useAuthContext } from '@/components/AppProviders';
import Dropdown, { IOption } from '@/components/Dropdown';
import RequireAuth from '@/components/RequireAuth';

import { useSignOutUser } from '@/hooks/queries/users';

import './style.scss';
import { handleEscapeKeydown } from '@/utils/keyboard-handlers';

export const UserIcon = () => {
  const signOutMutation = useSignOutUser();
  const { user } = useAuthContext();

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleUserIconClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOutsideClick = () => {
    setShowDropdown(false);
  };

  const handleSelect = async ({ value }: IOption) => {
    if (value === 'sign out') {
      await signOutMutation.mutateAsync();
    }
  };

  React.useEffect(() => {
    const handler = handleEscapeKeydown(() => {
      setShowDropdown(false);
    });

    if (showDropdown) {
      window.addEventListener('keydown', handler);
    }

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [showDropdown]);


  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      <RequireAuth actionName="onClick">
        <div className="user-icon"
          onClick={handleUserIconClick}>
          <button className="user-icon__picture">
            <FaUserAlt className={classNames('user-icon__svg', {
              'user-icon__svg--active': !!user,
            })}
            />
          </button>
          {(showDropdown && user) && (
            <Dropdown
              className="user-icon__actions"
              onSelect={handleSelect}
              options={[
                {
                  label: <span>{user.username}</span>,
                  value: user.username,
                },
                {
                  label: <span>Sign Out</span>,
                  value: 'sign out',
                },
              ]}
            />
          )}
        </div>
      </RequireAuth>
    </OutsideClickHandler>
  );
};
