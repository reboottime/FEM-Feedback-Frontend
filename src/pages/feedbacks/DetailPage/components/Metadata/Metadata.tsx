import React from 'react';

import Feedback from '@/components/Feedback';

import { useGetFeedback } from '@/hooks/queries/feedbacks';

export const Metadata: React.FC<Props> = ({ feedbackId }) => {
  const { data, isSuccess } = useGetFeedback(feedbackId);

  if (isSuccess) {
    return <Feedback {...data} />;
  }

  return null;
};

interface Props {
  feedbackId: TFeedback['id'];
}
