import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import NoData from './NoData';

import Feedback from '@/components/Feedback';

import './style.scss';

export const Feedbacks: React.FC<Props> = ({ feedbacks }) => (
  <div className={classNames('feedbacks', {
    'feedbacks--no-data border-rounded--large': (feedbacks.length === 0),
  })}
  >
    {feedbacks.length
      ? (
        <ul className="feedbacks__list">
          {feedbacks.map((feedback) => (
            <li
              className="feedbacks__list-item"
              key={feedback.id}
            >
              <Link
                className="feedbacks__item-link border-rounded--large"
                to={`/feedbacks/${feedback.id}`}
              >
                <Feedback {...feedback} />
              </Link>
            </li>
          ))}
        </ul>
      )
      : (
        <NoData />
      )}
  </div>
);

interface Props {
  feedbacks: TFeedback[];
}
