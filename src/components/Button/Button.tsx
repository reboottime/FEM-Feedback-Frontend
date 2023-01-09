import React from 'react';

import './Button.scss';

export const Button: React.FC<Props> = ({ children }) => {
  return <button className="rounded button">{children}</button>;
};

export interface Props {
  children: React.ReactNode;
}
