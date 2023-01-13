import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import FocusLock from 'react-focus-lock';

import { ReactComponent as CloseIcon } from '@/assets/shared/mobile/icon-close.svg';
import { ReactComponent as OpenIcon } from '@/assets/shared/mobile/icon-hamburger.svg';

import Overlay from '@/components/Overlay';

import './style.scss';

export const Sidebar: React.FC<Props> = ({ children, className }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const sidebar = sidebarRef.current;

    if (sidebar) {
      sidebar.tabIndex = -1;
      sidebar.focus();
    }
  }, []);

  return (
    <FocusLock
      disabled={!isSidebarOpen}
      returnFocus
    >
      <header className={classNames('sidebar__brand', className)}>
        <div className="sidebar__brand-name">
          <h1 className="typography-body-2 fw-bold">Frontend mentor</h1>
          <small className='typography-body-3'>Feedback board</small>
        </div>
        <button
          className="sidebar__toggle-btn"
          onClick={handleSidebarToggle}
        >
          {isSidebarOpen
            ? <CloseIcon />
            : <OpenIcon />}
        </button>
      </header>
      {isSidebarOpen && (
        <React.Fragment>
          <div
            className="sidebar"
            ref={sidebarRef}
          >
            <div className="sidebar__content">
              {React.Children.map(children, (child) => {
                return <div className="sidebar__item">{child}</div>;
              })}
            </div>
          </div>
          <Overlay
            className="sidebar__overlay"
            onClick={handleSidebarToggle}
          />
        </React.Fragment>
      )}
    </FocusLock>
  );
};

interface Props {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
}
