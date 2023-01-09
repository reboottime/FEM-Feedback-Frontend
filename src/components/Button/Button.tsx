import classNames from 'classnames';
import React from 'react';

import './style.scss';

export const Button: React.FC<Props> = ({
  children,
  disabled,
  fullWidth = false,
  mobileFullWidth = false,
  small = false,
  variant = 'purple',
  ...rest
}) => (
  <button
    className={classNames('button', `button--${variant}`, {
      'button--full-width': fullWidth,
      'button--mobile-full-width': mobileFullWidth,
      'button--small': small,
    })}
    disabled={disabled}
    {...rest}
  >
    {children}
  </button>
);

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | React.ReactElement;
  fullWidth?: boolean;
  mobileFullWidth?: boolean;
  small?: boolean;
  variant?: 'blue' | 'danger' | 'indigo' | 'plain' | 'purple';
}
