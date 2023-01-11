import React from 'react';

import Dot from '@/components/Dot';
import Feedback from '@/components/Feedback';

import { ROADMAP_STATUS_DESCRIPTION } from '@/constants/feedbacks';

import { mapStatusToDotVariant } from '@/utils/feedback';

import './style.scss';

export const StatusBoard: React.FC<Props> = ({ feedbacks, status }) => {
  const stats = {
    ...ROADMAP_STATUS_DESCRIPTION[status],
    count: feedbacks.length,
  };

  return (
    <div className="status-board">
      <div className="status-board__stats">
        <h3 className="status-board__title ">
          <Dot variant={mapStatusToDotVariant(status)} /> {stats.title} (
          {stats.count})
        </h3>
        <p className="status-board-description fw-regular">
          {stats.description}
        </p>
      </div>
      <ul className="status-board__items">
        {feedbacks.length
          ? (
            <React.Fragment>
              {feedbacks.map((feedback) => (
                <li
                  className="status-board__item"
                  key={feedback.id}
                >
                  <div className="status-board__item-status typography-body-3">
                    <Dot
                      size='small'
                      variant={mapStatusToDotVariant(status)}
                    />
                    <span>{status}</span>
                  </div>
                  <Feedback {...feedback} />
                </li>
              ))}
            </React.Fragment>
          )
          : (
            <li className="status-board__item border-rounded--large">
              No data so far
            </li>
          )}
      </ul>
    </div>
  );
};

interface Props {
  feedbacks: Entities.Feedback.TFeedback[];
  status: Entities.Feedback.TRoadmapStatus;
}
