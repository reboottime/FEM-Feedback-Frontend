import classNames from 'classnames';
import React from 'react';

import { ReactComponent as ArrowUp } from '@/assets/shared/icon-arrow-up.svg';

import './style.scss';

export const Vote: React.FC<Props> = ({
  hasVoted = false,
  mode = 'horizontal',
  onVote,
  votes,
}) => {
  const handleButtonClick: React.MouseEventHandler = (e) => {
    e.preventDefault();

    onVote();
  };

  return (
    <button
      className={classNames('vote border-rounded--large fw-bold', `vote--${mode}`, {
        'vote--voted': hasVoted
      })}
      onClick={handleButtonClick}
      title={hasVoted
        ? 'Revoke your vote'
        : 'Vote this feedback'
      }
    >
      <ArrowUp className={classNames('vote__arrow', {
        'vote__arrow--white': hasVoted,
      })}
      />
      <span className="vote__count">{votes}</span>
    </button>
  );
};

export interface Props {
  hasVoted?: boolean;
  mode?: 'horizontal' | 'vertical';
  onVote: () => void;
  votes: number;
}
