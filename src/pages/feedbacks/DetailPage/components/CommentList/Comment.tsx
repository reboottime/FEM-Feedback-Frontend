import classNames from 'classnames';
import React, { useState } from 'react';

import Author from './Author';
import CommentList from './CommentList';
import ReplyForm from './ReplyForm';

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
        {/* @todo: hide reply button if the current user is comment's author */}
        <button
          className="comment__reply-button typography-body-2 fw-semi-bold"
          onClick={handleReplyButtonClick}
        >
          Reply
        </button>
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
