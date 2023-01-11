import classNames from 'classnames';
import React from 'react';

import { ReactComponent as CommentsIcon } from '@/assets/shared/icon-comments.svg';

import { AuthContextType, useAuthContext } from '@/components/AppProviders';
import RequireAuth from '@/components/RequireAuth';
import Tag from '@/components/Tag';
import Vote from '@/components/Vote';

import { useVoteFeedback } from '@/hooks/queries/feedbacks';

import './style.scss';

export const Feedback: React.FC<Props> = ({ ...feedback }) => {
  const { user } = useAuthContext() as AuthContextType;

  const mutation = useVoteFeedback();

  const handleVote = () => {
    mutation.mutate(feedback.id as never);
  };

  const hasVoted = !!user && !!feedback.votes.find((voter) => voter === user.id);

  return (
    <div className='feedback'>
      <div className="feedback__content">
        <h3 className="feedback__title fw-bold">{feedback.title}</h3>
        <p className="feedback__detail fw-regular">{feedback.detail}</p>
        <Tag>{feedback.category}</Tag>
      </div>
      <div className="feedback__vote">
        <RequireAuth actionName='onVote'>
          <Vote
            hasVoted={hasVoted}
            mode="horizontal"
            onVote={handleVote}
            votes={feedback.vote_count}
          />
        </RequireAuth>
      </div>
      <div className="feedback__comment-stats flex-center-end">
        <CommentsIcon />
        <span
          className={classNames('feedback__comment-count', 'fw-semi-bold', {
            'feedback__comment-count--gray': !feedback.comment_count,
          })}
        >
          {feedback.comment_count}
        </span>
      </div>
    </div>
  );
};

export interface Props extends Omit<Entities.Feedback.TFeedback, 'auhtor'> {
  className?: string;
}
