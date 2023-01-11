import classNames from 'classnames';
import React from 'react';

import { PAGE_INFO } from './constants';

import Goback from '@/components/Goback';
import ToHome from '@/components/ToHome';
import UserIcon from '@/components/UserIcon';

export const FormPage: React.FC<Props> = ({ children, type }) => (
  <div className="form-page">
    <header className="form-page__header">
      <Goback />
      <div className="form-page__header-nav">
        <UserIcon />
        <ToHome />
      </div>
    </header>
    <div className={classNames('form-page__icon', `form-page__icon--${type}`)}>
      {PAGE_INFO[type].icon}
    </div>
    {children}
  </div>
);

export interface Props {
  children: (React.ReactElement | boolean)[] | React.ReactElement;
  type: 'add' | 'edit';
}
