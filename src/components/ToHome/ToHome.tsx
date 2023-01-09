import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import './style.scss';

export const ToHome = () => {
  return (
    <Link
      className="to-home-icon"
      to="/feedbacks"
    >
      <AiFillHome />
    </Link>
  );
};
