import classNames from 'classnames';
import React from 'react';
import { Portal } from 'react-portal';

import './style.scss';

export const Overlay: React.FC<Props> = ({
  className,
  onClick,
  visible = true,
}) => (
  <Portal>
    <div
      className={classNames('overlay', className, {
        'overlay--visible': visible,
      })}
      onClick={onClick}
    />
  </Portal>
);

export interface Props {
  className?: string;
  onClick: () => void;
  visible?: boolean;
}
