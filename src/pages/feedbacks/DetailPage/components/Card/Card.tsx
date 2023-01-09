import React from 'react';

import './style.scss';

export const Card: React.FC<Props> = ({ children, title }) => (
  <div className="component-card border-rounded--large">
    {title && (
      <h3 className="component-card__title typography-heading-3">{title}</h3>
    )}
    <div className="comppnent-card__content">{children}</div>
  </div>
);

export interface Props {
  children: React.ReactNode | React.ReactNode[];
  title?: string;
}
