import classNames from 'classnames';
import React, { useState } from 'react';
import { Portal } from 'react-portal';

import { ReactComponent as CloseIcon } from '@/assets/shared/mobile/icon-close.svg';
import { ReactComponent as OpenIcon } from '@/assets/shared/mobile/icon-hamburger.svg';

import Overlay from '@/components/Overlay';

import './style.scss';

export const Sidebar: React.FC<Props> = ({ children, className }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <React.Fragment>
      <header className={classNames('sidebar__brand', className)}>
        <div className="sidebar__brand-name">
          <h1 className="typography-body-2 fw-bold">Frontend mentor</h1>
          <small className='typography-body-3'>Feedback board</small>
        </div>
        <button
          className="home__toggle-btn"
          onClick={handleSidebarToggle}
        >
          {isSidebarOpen
            ? <CloseIcon />
            : <OpenIcon />}
        </button>
      </header>
      {isSidebarOpen && (
        <Portal>
          <aside className="sidebar">
            <div className="sidebar__content">
              {React.Children.map(children, (child) => {
                return <div className="sidebar__item">{child}</div>;
              })}
            </div>
          </aside>
          <Overlay
            className="sidebar__overlay"
            onClick={handleSidebarToggle}
          />
        </Portal>
      )}
    </React.Fragment>
  );
};

interface Props {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
}
