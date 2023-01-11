import React, { useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import OutsideClickHandler, {
  Props as OutsideClickHandlerProps,
} from 'react-outside-click-handler';
import { Portal } from 'react-portal';

import { ReactComponent as ArrowDownIcon } from '@/assets/shared/icon-arrow-down.svg';
import { ReactComponent as ArrowUpIcon } from '@/assets/shared/icon-arrow-up.svg';

import Dropdown, { IOption } from '@/components/Dropdown';

import {
  handleEnterSpaceKeydown,
  handleEscapeKeydown,
} from '@/utils/keyboard-handlers';

import './select.style.scss';

const Select: React.FC<Props> = ({
  options,
  value,
  onSelect,
}) => {
  const optionsContainerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const [selectedItem, setSelectedItem] = React.useState<IOption>(() =>
    options.find((option) => option.value === value) as IOption
  );
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  const handleOptionClick = (item: IOption) => {
    setSelectedItem(item);
    setIsExpanded(false);
    onSelect(item.value);
  };

  const handleOutsideClick: OutsideClickHandlerProps['onOutsideClick'] = () => {
    setIsExpanded(false);
  };

  const handleTriggerClick: React.MouseEventHandler = (e) => {
    e.preventDefault();

    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (isExpanded) {
      const handleEscKeydown = handleEscapeKeydown(() => {
        setIsExpanded(false);
        triggerRef.current?.blur();
      });

      window.addEventListener('keydown', handleEscKeydown as never);
    }

    return () => {
      window.removeEventListener('keydown', handleEnterSpaceKeydown as never);
    };
  }, [isExpanded]);

  return (
    <div className="select flex-center-between">
      <OutsideClickHandler onOutsideClick={handleOutsideClick}>
        <button
          aria-expanded={isExpanded}
          className="select__trigger fw-semi-bold"
          onClick={handleTriggerClick}
          ref={triggerRef}
          tabIndex={0}
        >
          <span className="select__trigger-text">
            {selectedItem.label}
          </span>
          {isExpanded
            ? <ArrowUpIcon className="select__trigger-icon" />
            : <ArrowDownIcon className="select__trigger-icon" />
          }
        </button>
        <div
          className="select__options-container"
          ref={optionsContainerRef}
        />
        <Portal node={optionsContainerRef.current}>
          {isExpanded && (
            <FocusLock>
              <Dropdown
                className="select__options fw-regular"
                onSelect={handleOptionClick}
                options={options}
                selected={selectedItem?.value}
              />
            </FocusLock>
          )}
        </Portal>
      </OutsideClickHandler>
    </div>
  );
};

export default Select;

interface Props {
  onSelect: (value: string) => void;
  options: IOption[];
  value: string;
}
