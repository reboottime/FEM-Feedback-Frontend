import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import '@reach/tabs/styles.css';
import classNames from 'classnames';
import React from 'react';

import { useIsMobile } from '@/hooks/mediaQueries';
import StatusItems from '@/pages/roadmap/components/StatusItems';
import { mapStatusToDotVariant } from '@/utils/feedback';

import './style.scss';

const TAB_ORDER: Entities.Feedback.TRoadmapStatus[] = [
  'planned',
  'in progress',
  'live',
];

export const Kanban: React.FC<Props> = ({ feedbacks }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="kanban">
        <Tabs>
          <TabList className="kanban__tablist">
            {TAB_ORDER.map((key) => (
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
            {TAB_ORDER.map((key) => (
              <TabPanel className="kanban__tabpanel"
                key={key}>
                <StatusItems feedbacks={[]} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </div>
    );
  }

  return <p>desktop version is under building</p>;
};

interface Props {
  feedbacks: Entities.Feedback.TFeedback[];
}
