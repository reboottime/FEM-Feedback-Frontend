import React from 'react';

import Card from './components/Card';
import AddComment from './components/AddComment';

import './style.scss';

export const DetailPage = () => {
  return (
    <div className="detai-page">
      <Card>
        <AddComment />
      </Card>
    </div>
  );
};

export default DetailPage;
