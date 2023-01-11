/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import React from 'react';
import { groupBy } from 'lodash';

import Comment from './Comment';

import './commentList.style.scss';

export const CommentList: React.FC<Props> = ({ comments, replyToComment }) => {
  const { undefined: rootComments, ...restcomments } = groupBy(comments, 'replyToComment');

  const commentList = !replyToComment
    ? rootComments
    : restcomments[replyToComment];

  return (
    <ul
      className={classNames('comment-list', {
        'comment-list--is-sub': replyToComment,
      })}
    >
      {(commentList).map((item) => (
        <li className="comment-list__item"
          key={item.id}>
          <Comment
            {...item as any}
            comments={restcomments[item.id]}
            replyToComment={replyToComment || item.id}
          />
        </li>
      ))}
    </ul>
  );
};

export interface Props {
  comments: Entities.TComment[];
  replyToComment?: Entities.TComment['id'];
}

export default CommentList;
