import classNames from 'classnames';
import React from 'react';

import './author.style.scss';

const getFullName = (user: TAuthor) => {
  const { firstName = '', lastName = '', username } = user;

  if (firstName + lastName) {
    return `${firstName} ${lastName}`;
  }

  return username;
};

const Author: React.FC<Props> = ({ className, ...user }) => (
  <div className={classNames('author', className)}>
    <img
      alt=""
      aria-hidden={true}
      className="author__avatar"
      src={user.avatar}
    />
    <div className="author__metadata">
      <span className="author__name">{getFullName(user)}</span>
      <span className="author__handle">@{user.username}</span>
    </div>
  </div>
);

export type TAuthor = Omit<Entities.TComment['author'], 'updatedAt' | 'createdAt'>;

export interface Props extends TAuthor {
  className?: string;
}

export default Author;
