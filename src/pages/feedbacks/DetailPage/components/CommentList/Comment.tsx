import classNames from 'classnames';
import React, { useState } from 'react';

import Author from './Author';
import CommentList from './CommentList';
import ReplyForm from './ReplyForm';

import RequireAuth from '@/components/RequireAuth';

import './comment.style.scss';

const Comment: React.FC<Props> = ({ comments, replyToComment, ...comment }) => {
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);

  const handleReplyButtonClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  return (
    <div
      className={classNames('comment', {
        'comment--has-sub': comments?.length,
      })}
    >
      <div className="comment__header">
        <Author {...comment.author} />
        <RequireAuth actionName="onClick">
          <button
            className="comment__reply-button typography-body-2 fw-semi-bold"
            onClick={handleReplyButtonClick}
          >
            Reply
          </button>
        </RequireAuth>
      </div>
      <div className="comment__content">
        {comment.replyToUser && (
          <span className="comment__reply-to fw-semi-bold">
            @{comment.replyToUser.username}
          </span>
        )}
        {comment.detail}
        {showReplyInput && (
          <ReplyForm
            onAdded={handleReplyButtonClick}
            toComment={replyToComment || comment.id}
            toFeedback={comment.feedbackId}
            toUser={comment.author.id}
          />
        )}
      </div>
      {comments?.length && (
        <CommentList comments={comments}
          replyToComment={replyToComment} />
      )}
    </div>
  );
};

export default Comment;

export interface Props extends TComment {
  comments?: TComment[];
  replyToComment?: TComment['id'];
  replyToUser?: TComment['author'];
}
