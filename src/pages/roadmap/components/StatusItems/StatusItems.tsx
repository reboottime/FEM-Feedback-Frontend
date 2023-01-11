import React from 'react';

import './style.scss';

export const StatusItems: React.FC<Props> = ({ feedbacks }) => {
  return <ul></ul>;
};

interface Props {
  feedbacks: Entities.Feedback.TFeedback[];
}
