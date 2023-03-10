import classNames from 'classnames';
import { groupBy } from 'lodash';
import React from 'react';

import { BOARD_ORDER } from './constants';
import StatusBoard from '../StatusBoard';

import Spinner from '@/components/Spinner';

import { useGetFeedbacks } from '@/hooks/queries/feedbacks';

import './tablet.style.scss';

export const KanbanTabletLayout: React.FC = () => {
  const {
    data: feedbacks,
    isLoading: feedbacksAreLoading,
    isSuccess: feedbacksAreLoaded,
  } = useGetFeedbacks();

  const groupedFeedbacks = groupBy(feedbacks, (item) => item.status);

  if (feedbacksAreLoading) {
    return (
      <Spinner
        center
        cover
      />);
  }

  if (feedbacksAreLoaded) {
    return (
      <div className={classNames('kanban', {
      })}>
        <ul className='kanban__list'>
          {BOARD_ORDER.map((key) => (
            <li
              className="kanban__list-item"
              key={key}
            >
              <StatusBoard
                feedbacks={groupedFeedbacks[key] ?? []}
                status={key}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};
