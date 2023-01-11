import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import '@reach/tabs/styles.css';
import classNames from 'classnames';
import React from 'react';
import { groupBy } from 'lodash';

import { useIsMobile } from '@/hooks/mediaQueries';
import StatusBoard from '@/pages/roadmap/components/StatusBoard';
import { mapStatusToDotVariant } from '@/utils/feedback';

import './style.scss';

const BOARD_ORDER: Entities.Feedback.TRoadmapStatus[] = [
  'planned',
  'in progress',
  'live',
];

export const Kanban: React.FC<Props> = ({ feedbacks }) => {
  const isMobile = useIsMobile();

  const groupedItems = groupBy(feedbacks, (item) => item.status);

  if (isMobile) {
    return (
      <div className="kanban">
        <Tabs>
          <TabList className="kanban__tablist">
            {BOARD_ORDER.map((key) => (
              <Tab
                className={classNames(
                  'kanban__tab',
                  `kanban__tab--${mapStatusToDotVariant(key)}`
                )}
                key={key}
              >
                {key}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {BOARD_ORDER.map((key) => (
              <TabPanel
                className="kanban__tabpanel"
                key={key}
              >
                <StatusBoard
                  feedbacks={groupedItems[key]}
                  status={key}
                />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </div>
    );
  }

  return (
    <div className={classNames('kanban', {
      'kanban--tablet': !isMobile
    })}>
      <ul className='kanban__list'>
        {BOARD_ORDER.map((key) => (
          <li
            className="kanban__list-item"
            key={key}
          >
            <StatusBoard
              feedbacks={groupedItems[key]}
              status={key}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

interface Props {
  feedbacks: Entities.Feedback.TFeedback[];
}
