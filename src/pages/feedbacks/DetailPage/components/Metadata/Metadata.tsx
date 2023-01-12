import React from 'react';

import { useGetFeedback } from '@/hooks/queries/feedbacks';
import Feedback from '@/components/Feedback';

export const Metadata: React.FC<Props> = ({ feedbackId }) => {
  const { data, isSuccess, } = useGetFeedback(feedbackId);

  if (isSuccess) {
    return <Feedback {...data} />;
  }

  return null;
};

interface Props {
  feedbackId: Entities.Feedback.TFeedback['id'];
}
