import classNames from 'classnames';
import React from 'react';

import { ReactComponent as CommentsIcon } from '@/assets/shared/icon-comments.svg';

import { useAuthContext } from '@/components/AppProviders';
import RequireAuth from '@/components/RequireAuth';
import Tag from '@/components/Tag';
import Vote from '@/components/Vote';

import { useVoteFeedback } from '@/hooks/queries/feedbacks';
import { useIsSmallMobile } from '@/hooks/mediaQueries';

import './style.scss';

export const Feedback: React.FC<Props> = ({ smallSize, ...feedback }) => {
  const isSmallMobile = useIsSmallMobile();
  const { user } = useAuthContext();

  const hasVoted = !!feedback.votes.find((voter) => voter === user?.id);

  const voteMutation = useVoteFeedback();

  const handleVoteFeedback = () => {
    voteMutation.mutate(feedback.id);
  };

  return (
    <div
      className={classNames('feedback', {
        'feedback--small-size': smallSize,
      })}
    >
      <div className="feedback__content">
        <h3 className="feedback__title fw-bold">{feedback.title}</h3>
        <p className="feedback__detail">{feedback.detail}</p>
        <Tag>{feedback.category}</Tag>
      </div>
      <div className="feedback__vote">
        <RequireAuth actionName="onVote">
          <Vote
            hasVoted={hasVoted}
            mode={(smallSize || isSmallMobile)
              ? 'horizontal'
              : 'vertical'}
            onVote={handleVoteFeedback}
            votes={feedback.votes.length}
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

export interface Props extends Omit<TFeedback, 'auhtor'> {
  className?: string;
  smallSize?: boolean;
}
