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
    if (visible) {
      // Avoid page cotent shifting when opening modal
      const bodyWidth = document.body.clientWidth;

      document.body.style.width = bodyWidth + 'px';
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.width = 'auto';
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
