import classNames from 'classnames';
import React from 'react';

import { ReactComponent as EmptyImg } from '@/assets/suggestions/illustration-empty.svg';

import './style.scss';

export const YouAreLost: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={classNames('you-are-lost border-rounded--large', className)}>
      <EmptyImg />
      <p className="typography-body-1">
        When we lose something that is precious to us, we are left with a
        feeling of sadness. Whether it is a precious friend or even a treasured
        object, the loss can be hard to bear. It is as if a part of you has gone
        missing. Throughout our life we amass collections of friends and
        treasured possessions.
      </p>
      {children}
    </div>
  );
};

interface Props {
  children?: React.ReactNode;
  className?: string;
}
