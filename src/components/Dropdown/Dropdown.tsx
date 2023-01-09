import classNames from 'classnames';
import * as React from 'react';

import { ReactComponent as CheckIcon } from '@/assets/shared/icon-check.svg';

import { handleEnterSpaceKeydown } from '@/utils/keyboard-handlers';

import './style.scss';

export const Dropdown: React.FC<Props> = React.forwardRef(
  (
    { className, options, selected: selectedValue, onSelect }: Props,
    ref: React.ForwardedRef<HTMLUListElement>
  ) => (
    <ul
      className={classNames('dropdown', className)}
      ref={ref}
      role="listbox"
      tabIndex={-1}
    >
      {options.map((item) => {
        const isSelected = item.value === selectedValue;
        const handleKeyDown = handleEnterSpaceKeydown((e) => {
          e.preventDefault();

          onSelect?.(item);
        });

        return (
          <li
            aria-selected={isSelected}
            className={classNames('dropdown__option', {
              'dropdown__option--selected': isSelected,
            })}
            key={item.value}
            onClick={onSelect?.bind(null, item)}
            onKeyDown={handleKeyDown}
            role="option"
            tabIndex={0}
          >
            <div className="dropdown__option-content">
              <span>{item.label}</span>
              {isSelected && (
                <CheckIcon className="dropdown__option-check-mark" />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  )
);

Dropdown.displayName = 'Dropdown';

export interface IOption {
  label: string | React.ReactElement;
  value: string;
}

export interface Props {
  className?: string;
  onSelect?: (option: IOption) => void;
  options: IOption[];
  selected?: string;
}
