import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

export const ListPage = () => {
  return (
    <div>
      <Link to="/feedbacks/add">add</Link>
      <Link to={'/feedbacks/63bb72fd95ed1ecaa6cc29e1/edit'}>edit</Link>
    </div>
  );
};

export default ListPage;
