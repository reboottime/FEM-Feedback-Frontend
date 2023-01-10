import classNames from 'classnames';
import React, { useEffect } from 'react';
import { Portal } from 'react-portal';

import './style.scss';

export const Overlay: React.FC<Props> = ({
  className,
  onClick,
  visible = true,
}) => {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;

    if (visible) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [visible]);

  return (
    <Portal>
      <div
        className={classNames('overlay', className, {
          'overlay--visible': visible,
        })}
        onClick={onClick}
      />
    </Portal>
  );
};

export interface Props {
  className?: string;
  onClick: () => void;
  visible?: boolean;
}
