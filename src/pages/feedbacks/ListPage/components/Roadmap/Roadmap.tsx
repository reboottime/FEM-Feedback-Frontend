import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { merge } from 'lodash';

import Dot from '@/components/Dot';

import { mapStatusToDotVariant } from '@/utils/feedback';
import { useGetFeedbacksStats } from '@/hooks/queries/feedbacks';

import './style.scss';

const STATS_TEMPLATE = {
  planned: 0,
  'in progress': 0,
  live: 0,
};

export const Roadmap: React.FC<Props> = ({ className }) => {
  const { data = {} } = useGetFeedbacksStats();

  const statsMap = merge(STATS_TEMPLATE, data);
  const statsArray = Object.entries(statsMap)
    .map(([key, value]) =>
      key !== 'new'
        ? {
          count: value,
          status: key as Entities.Feedback.TRoadmapStatus,
        }
        : null
    )
    .filter(Boolean) as TStatsItem[];

  return (
    <div className={classNames('roadmap border-rounded--large', className)}>
      <div className="roadmap__title">
        <h3 className="typography-heading-3">Roadmap</h3>
        <Link
          className="roadmap__link fw-semi-bold"
          to="/roadmap"
        >
          View
        </Link>
      </div>
      <ul>
        {statsArray.map((item) => (
          <li
            className="roadmap__item"
            key={item.status}
          >
            <div>
              <Dot
                size="large"
                variant={mapStatusToDotVariant(item.status)}
              />
              <span className="roadmap__item-name">{item.status}</span>
            </div>
            <span className="roadmap__item-count fw-bold">{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

type TStatsItem = {
  count: number;
  status: Entities.Feedback.TRoadmapStatus;
};

interface Props {
  className?: string;
}
