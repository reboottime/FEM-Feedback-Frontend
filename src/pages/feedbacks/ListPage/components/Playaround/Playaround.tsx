import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

export const Playaround: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames('playaround border-rounded--large', className)}>
      <div className="playaround__title">
        <h3 className="typography-heading-3">Play Around</h3>
      </div>
      <p>
        <Link className="roadmap__link fw-semi-bold"
          to="/users">
          Pick a test account
        </Link>
      </p>
    </div>
  );
};
