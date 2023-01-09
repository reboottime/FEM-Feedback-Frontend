import React from 'react';
import { useParams } from 'react-router-dom';

import Card from './components/Card';
import AddComment from './components/AddComment';

import './style.scss';

export const DetailPage = () => {
  const { feedbackId = '' } = useParams();

  return (
    <div className="detai-page">
      <Card>
        <AddComment toFeedback={feedbackId} />
      </Card>
    </div>
  );
};

export default DetailPage;
