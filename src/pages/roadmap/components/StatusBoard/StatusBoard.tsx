import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import { AuthContextType, useAuthContext } from '@/components/AppProviders';
import Dot from '@/components/Dot';
import Feedback from '@/components/Feedback';

import { ROADMAP_STATUS_DESCRIPTION } from '@/constants/feedbacks';

import { isPublishedFeedback, mapStatusToDotVariant } from '@/utils/feedback';
import { isAdminUser } from '@/utils/user';

import './style.scss';

export const StatusBoard: React.FC<Props> = ({ feedbacks, status }) => {
  const { user } = useAuthContext() as AuthContextType;

  const stats = {
    ...ROADMAP_STATUS_DESCRIPTION[status],
    count: feedbacks.length,
  };
  const themeVariant = mapStatusToDotVariant(status);

  return (
    <div className="status-board">
      <div className="status-board__stats">
        <h3 className="status-board__title ">
          <Dot variant={themeVariant} /> {stats.title} ({stats.count})
        </h3>
        <p className="status-board__description fw-regular">
          {stats.description}
        </p>
      </div>
      <ul>
        {feedbacks.length
          ? (
            <React.Fragment>
              {feedbacks.map((feedback) => (
                <li
                  className="status-board__item border-rounded--large"
                  key={feedback.id}
                >
                  <div
                    className={classNames(
                      'status-board__item-line',
                      `status-board__item-line--${themeVariant}`
                    )}
                  />
                  <div className="status-board__item-content">
                    <div className="status-board__item-heading flex-center-between typography-body-3">
                      <div className="status-board__item-status flex-center-between">
                        <Dot size="small"
                          variant={themeVariant} />
                        <span>{status}</span>
                      </div>
                      <div className="status-board__btn-group">
                        {isAdminUser(user) && !isPublishedFeedback(feedback) && (
                          <Link
                            className="status-board__item-btn typography-body-3 fw-semi-bold"
                            to={`/feedbacks/${feedback.id}/edit`}
                          >
                            Edit
                          </Link>
                        )}
                        <Link
                          className="status-board__item-btn typography-body-3 fw-semi-bold"
                          to={`/feedbacks/${feedback.id}`}
                        >
                          View
                        </Link>
                      </div>
                    </div>
                    <Feedback
                      {...feedback}
                      smallSize
                    />
                  </div>
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
