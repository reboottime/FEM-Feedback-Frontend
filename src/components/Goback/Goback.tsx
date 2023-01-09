import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ArrowLeftIcon } from '@/assets/shared/icon-arrow-left.svg';

import './style.scss';

export const Goback: React.FC<Props> = ({ variant = 'plain' }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(-1);
  };

  return (
    <button
      className={classNames(
        'go-back',
        `go-back--${variant}`,
        'typography-heading-4 fw-bold'
      )}
      onClick={handleButtonClick}
    >
      <ArrowLeftIcon className="go-back__icon" />
      <span className="go-back__text">Go Back</span>
    </button>
  );
};

export interface Props {
  variant?: 'plain' | 'white';
}
