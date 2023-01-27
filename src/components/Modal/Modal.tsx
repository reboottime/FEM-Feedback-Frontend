import React, { useEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock';
import OutsideClickHandler from 'react-outside-click-handler';
import { Portal } from 'react-portal';

import { ReactComponent as CloseIcon } from '@/assets/shared/mobile/icon-close.svg';

import Overlay from '@/components/Overlay';

import { handleEscapeKeydown } from '@/utils/keyboard';

import './style.scss';

export const Modal: React.FC<Props> = ({
  children,
  footer,
  maxHeight,
  maxWidth,
  onClose,
  title,
}) => {
  const onCloseRef = useRef(onClose);

  const handleModalClose: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    onClose();
  };

  const handleModalClick: React.MouseEventHandler = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    // Avoid page cotent shifting when opening modal
    const bodyWidth = document.body.clientWidth;

    document.body.style.width = bodyWidth + 'px';
    document.body.style.overflow = 'hidden';

    const handler = handleEscapeKeydown(onCloseRef.current);

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);

      document.body.style.overflow = 'auto';
      document.body.style.width = 'auto';
    };
  }, []);

  return (
    <Portal>
      <FocusLock returnFocus>
        <div
          className="modal"
          onClick={handleModalClick}
          role="dialog">
          <div className="modal__dialog"
          >
            <OutsideClickHandler onOutsideClick={onClose}>
              <div
                className="modal__content border-rounded--large"
                {...maxWidth && { style: { maxWidth } }}
              >
                <header className="modal__header flex-center-between">
                  <h3 className="modal__title typography-body-1 fw-semi-bold">
                    {title}
                  </h3>
                  <button
                    className="modal__close-button"
                    onClick={handleModalClose}
                  >
                    <CloseIcon />
                  </button>
                </header>
                <div
                  className="modal__body"
                  {...(maxHeight && { style: { maxHeight } })}
                >
                  {children}
                </div>
                {footer && <footer className="modal__footer">{footer}</footer>}
              </div>
            </OutsideClickHandler>
          </div>
        </div>
      </FocusLock>
      <Overlay onClick={onClose} />
    </Portal>
  );
};

export interface Props {
  children: React.ReactElement | React.ReactNode | React.ReactNode[];
  footer?: React.ReactElement | React.ReactNode;
  maxHeight?: string;
  maxWidth?: string;
  onClose: () => void;
  title: string;
}
