import classNames from 'classnames';
import React, { useState } from 'react';

import Author from './Author';
import CommentList from './CommentList';
import ReplyForm from './ReplyForm';

import RequireAuth from '@/components/RequireAuth';

import './comment.style.scss';

const Comment: React.FC<Props> = ({ comments, ...comment }) => {
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);

  const handleReplyButtonClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  return (
    <div
      className={classNames('comment', {
        'comment--has-sub': !!comments?.length,
      })}
    >
      <div className="comment__header">
        <Author {...comment.author} />
        <RequireAuth actionName='onClick'>
          <button
            className="comment__reply-button typography-body-2 fw-semi-bold"
            onClick={handleReplyButtonClick}
          >
            Reply
          </button>
        </RequireAuth>
      </div>
      <p className="comment__content">{comment.detail}</p>
      {showReplyInput && (
        <ReplyForm
          toComment={comment.id}
          toFeedback={comment.feedbackId}
        />)}
      {comments?.length && (
        <CommentList
          comments={comments}
          feedbackId={comments[0].feedbackId}
          isSubComments
        />)
      }
    </div>
  );
};

export default Comment;

export interface Props extends Entities.TComment {
  comments: Entities.TComment[]
}
