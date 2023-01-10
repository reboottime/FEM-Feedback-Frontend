import React from 'react';

import './style.scss';

export const Navigation: React.FC<Props> = ({ children }) => {
  return (
    <nav className="nav">
      {React.Children.map(children, (child) => (
        <div className="nav__item border-rounded--large">{child}</div>
      ))}
    </nav>
  );
};

interface Props {
  children: React.ReactElement[];
}
