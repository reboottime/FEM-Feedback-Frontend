import classNames from 'classnames';
import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

import './style.scss';

export const Spinner: React.FC<Props> = ({ className, center }) => {
  return (
    <div className={classNames('spinner', className, {
      'spinner--center': center,
    })}
    >
      <InfinitySpin color="hsl(230 76% 59% / 100%)"
        width="200" />
    </div>
  );
};

interface Props {
  center: boolean;
  className?: string;
}
