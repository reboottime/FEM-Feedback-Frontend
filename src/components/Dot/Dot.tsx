import classNames from 'classnames';
import React from 'react';

import './style.scss';

export const Dot: React.FC<Props> = ({ size = 'large', variant }) => (
  <span className={classNames('dot', `dot--${size} dot--${variant}`)}></span>
);

export interface Props {
  size?: 'large' | 'small';
  variant: 'blue' | 'orange' | 'purple';
}
