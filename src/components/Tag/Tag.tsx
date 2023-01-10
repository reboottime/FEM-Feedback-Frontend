import classNames from 'classnames';
import React from 'react';

import { handleEnterSpaceKeydown } from '@/utils/keyboard-handlers';

import './style.scss';

export const Tag: React.FC<Props> = ({
  active,
  clickable,
  children,
  onClick,
}) => (
  <span
    className={classNames('tag', 'border-rounded--large', 'fw-semi-bold', {
      'tag--active': (clickable && active),
      'tag--clickable': clickable,
    })}
    {...(clickable && {
      onClick: onClick,
      onKeyDown: handleEnterSpaceKeydown(onClick as React.KeyboardEventHandler),
      role: 'button',
      tabIndex: 0,
    })}
  >
    {children}
  </span>
);

export interface Props {
  active?: boolean;
  children: string;
  clickable?: boolean;
  onClick?: React.EventHandler<React.KeyboardEvent | React.MouseEvent>;
}
