import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import Dot from '@/components/Dot';
import Feedback from '@/components/Feedback';

import { ROADMAP_STATUS_DESCRIPTION } from '@/constants/feedbacks';
import Button from '@/components/Button';
import { AuthContextType, useAuthContext } from '@/components/AppProviders';
import { mapStatusToDotVariant } from '@/utils/feedback';
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
                <li className="status-board__item"
                  key={feedback.id}>
                  <Link
                    className="status-board__item-link border-rounded--large"
                    to={`/feedbacks/${feedback.id}`}
                  >
                    <div
                      className={classNames(
                        'status-board__item-line',
                        `status-board__item-line--${themeVariant}`
                      )}
                    ></div>
                    <div className="status-board__item-content">
                      <div className="status-board__item-status typography-body-3">
                        <div>
                          <Dot size="small"
                            variant={themeVariant} />
                          <span>{status}</span>
                        </div>
                        {(isAdminUser(user) && (feedback.status !== 'live')) && (
                          <Link
                            className="status-board__item-edit typography-body-3 fw-regular"
                            to={`/feedbacks/${feedback.id}/edit`}
                          >
                            Edit
                          </Link>
                        )}
                      </div>
                      <Feedback {...feedback} />
                    </div>
                  </Link>
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
