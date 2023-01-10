/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import React from 'react';
import groupyBy from 'lodash/groupBy';

import Comment from './Comment';

import './commentList.style.scss';

export const CommentList: React.FC<Props> = ({ comments, isSubComments }) => {
  const { undefined: rootComments = [], ...rest } = groupyBy(
    comments,
    'replyTo'
  );
  const groupedComments = rootComments.map((item) => {
    const { id, ...metadata } = item;
    const subComments = rest[id];

    return {
      id,
      ...metadata,
      ...(subComments && { comments: subComments }),
    };
  });

  return (
    <ul
      className={classNames('comment-list', {
        'comment-list--is-sub': isSubComments,
      })}
    >
      {(
        isSubComments
          ? comments
          : groupedComments).map((item) => (
        <li className="comment-list__item"
          key={item.id}>
          <Comment  {...item as any} />
        </li>
      ))}
    </ul>
  );
};

export interface Props {
  comments: Entities.TComment[];
  feedbackId: Entities.Feedback.TFeedback['id'];
  isSubComments?: boolean;
}

export default CommentList;
