import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import * as React from 'react';
import FocusLock from 'react-focus-lock';
import { useFormContext } from 'react-hook-form';
import OutsideClickHandler, {
  Props as OutsideClickHandlerProps,
} from 'react-outside-click-handler';
import { Portal } from 'react-portal';

import ErrorDesc from './ErrorDesc';
import FieldLabel from './FieldLabel';
import useControllId from './useControllId';
import { FormFieldProps } from './typings';

import { ReactComponent as ArrowDownIcon } from '@/assets/shared/icon-arrow-down.svg';
import { ReactComponent as ArrowUpIcon } from '@/assets/shared/icon-arrow-up.svg';

import Dropdown, { IOption } from '@/components/Dropdown';

import { handleArrowKeydown, handleEscapeKeydown } from '@/utils/keyboard-handlers';

import './select.style.scss';

export const Select: React.FC<SelectProps> = ({
  disabled,
  description,
  name,
  options,
  placeholder = 'Please select',
  title,
  ...rest
}) => {
  const {
    getValues,
    register,
    formState: { errors },
  } = useFormContext();

  const controlId = useControllId(name);
  const filedProps = register(name, { ...rest });

  const optionsContainerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const [selectedItem, setSelectedItem] = React.useState<IOption | undefined>(
    () => {
      const value = getValues(name);

      return options.find((item) => item.value === value);
    }
  );

  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  const handleOptionClick = (item: IOption) => {
    setSelectedItem(item);
    setIsExpanded(false);

    filedProps.onChange({
      target: {
        name,
        value: item.value,
      },
      type: 'change'
    });
  };

  const handleOutsideClick: OutsideClickHandlerProps['onOutsideClick'] = () => {
    inputRef.current?.blur();
    setIsExpanded(false);
  };

  const handleTriggerClick: React.MouseEventHandler = (e) => {
    e.preventDefault();

    inputRef.current?.focus();
    setIsExpanded(!isExpanded);
  };

  const handleTriggerKeydown = handleArrowKeydown(() => {
    setIsExpanded(true);
  });

  const handleInputFocus = () => {
    triggerRef.current?.focus();
  };

  React.useEffect(() => {
    const handleKeydown = handleEscapeKeydown(() => {
      setIsExpanded(false);
      inputRef.current?.blur();
    });

    if (isExpanded) {
      window.addEventListener('keydown', handleKeydown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [isExpanded]);

  return (
    <div className="form-field form-field--full-width">
      {/* Idea learned from react-select */}
      <input
        className="form-field__dummpy-input"
        defaultValue={selectedItem?.value}
        disabled={disabled}
        id={controlId}
        name={name}
        onFocus={handleInputFocus}
        type="text"
      />
      <FieldLabel description={description}
        htmlFor={controlId}
        title={title} />
      <OutsideClickHandler onOutsideClick={handleOutsideClick}>
        <button
          aria-expanded={isExpanded}
          className={classNames('form-field__trigger', {
            'form-field--disabled': disabled,
            'form-field__trigger--error': !!errors[name],
          })}
          disabled={disabled}
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeydown}
          ref={triggerRef}
          tabIndex={0}
        >
          <span className="form-field__trigger-text">
            {selectedItem?.label ?? placeholder}
          </span>
          <span className="form-field__trigger-icon">
            {isExpanded
              ? <ArrowUpIcon />
              : <ArrowDownIcon />}
          </span>
        </button>
        <div
          className="form-field__options-container"
          ref={optionsContainerRef}
        />
        <Portal node={optionsContainerRef.current}>
          {isExpanded && (
            <FocusLock>
              <Dropdown
                className="form-field__select-options"
                onSelect={handleOptionClick}
                options={options}
                selected={selectedItem?.value}
              />
            </FocusLock>
          )}
        </Portal>
      </OutsideClickHandler>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <ErrorDesc message={message} />}
      />
    </div>
  );
};

export interface SelectProps
  extends Omit<
    React.HtmlHTMLAttributes<HTMLSelectElement>,
    'maxLength' | 'required' | 'minLength'
  >,
  FormFieldProps {
  options: IOption[];
}
