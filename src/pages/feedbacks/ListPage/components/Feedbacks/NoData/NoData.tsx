import React from 'react';

import { ReactComponent as EmptyImg } from '@/assets/suggestions/illustration-empty.svg';

import AddButton from '@/pages/feedbacks/ListPage/components/AddButton';

import './style.scss';

export const NoData: React.FC = () => (
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
    <AddButton />
  </article>
);
