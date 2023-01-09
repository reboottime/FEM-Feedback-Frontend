import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import OutsideClickHandler from 'react-outside-click-handler';

import { AuthContextType, useAuthContext } from '@/components/AppProviders';
import Dropdown, { IOption } from '@/components/Dropdown';

import { useSignOutUser } from '@/hooks/queries/users';

import './style.scss';

export const UserIcon = () => {
  const signOutMutation = useSignOutUser();
  const { user } = useAuthContext() as AuthContextType;

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

  if (!user) {
    return null;
  }

  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      <div className="user-icon"
        onClick={handleUserIconClick}>
        <button className="user-icon__picture">
          <FaUserAlt />
        </button>
        {showDropdown && (
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
    </OutsideClickHandler>
  );
};
