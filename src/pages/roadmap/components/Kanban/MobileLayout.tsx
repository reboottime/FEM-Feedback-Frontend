import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import '@reach/tabs/styles.css';
import classNames from 'classnames';
import { groupBy } from 'lodash';
import React from 'react';

import { BOARD_ORDER } from './constants';

import Spinner from '@/components/Spinner';

import StatusBoard from '@/pages/roadmap/components/StatusBoard';

import { mapStatusToDotVariant } from '@/utils/feedback';
import { useGetFeedbacks } from '@/hooks/queries/feedbacks';

import './style.scss';

export const KanbanMobileLayout: React.FC = () => {
  const {
    data: feedbacks,
    isLoading: feedbacksAreLoading,
    isSuccess: feedbacksAreLoaded,
  } = useGetFeedbacks();

  const groupedFeedbacks = groupBy(feedbacks, (item) => item.status);

  return (
    <Tabs className="kanban">
      <TabList className="kanban__tablist">
        {BOARD_ORDER.map((key) => (
          <Tab
            className={classNames(
              'kanban__tab',
              `kanban__tab--${mapStatusToDotVariant(key)}`,
            )}
            key={key}
          >
            {key}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="kanban__panels">
        {feedbacksAreLoading && (
          <Spinner
            center
            cover
          />
        )}
        {feedbacksAreLoaded && BOARD_ORDER.map((key) => (
          <TabPanel
            className="kanban__tabpanel"
            key={key}>
            <StatusBoard
              feedbacks={groupedFeedbacks[key] ?? []}
              status={key}
            />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
