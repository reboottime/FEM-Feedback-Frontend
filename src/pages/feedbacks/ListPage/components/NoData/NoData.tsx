import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ReactComponent as EmptyImg } from '@/assets/suggestions/illustration-empty.svg';

import { AuthContextType, useAuthContext } from '@/components/AppProviders';
import Button from '@/components/Button';

import './style.scss';

export const NoData: React.FC = () => {
  const { user } = useAuthContext() as AuthContextType;

  const handleButtonClick = () => {
    if (!user) {
      toast.info('You need to sign first before adding feedback');
    }
  };

  return (
    <article className="no-data">
      <EmptyImg className="no-data__img" />
      <div className="no-data__content">
        <p className="no-data__title"
          role="heading"
        >There is no feedback yet.</p>
        <p className="no-data__reminder-text">
          Got a suggestion? Found a bug that needs to be squashed?
          <br />
          We love hearing about new ideas to improve our app.
        </p>
      </div>
      <Link to="/feedbacks/add">
        <Button onClick={handleButtonClick}>+ Add Feedback</Button>
      </Link>
    </article>
  );
};
