import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import ErrorDesc from './ErrorDesc';
import FieldLabel from './FieldLabel';
import useControllId from './useControllId';
import { FormFieldProps } from './typings';

export const Input: React.FC<InputProps> = ({
  description,
  disabled,
  fullWidth = true,
  name,
  placeholder = 'please input',
  title,
  type = 'text',
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasFieldError = errors[name];

  const controlId = useControllId(name);

  return (
    <div
      className={classNames('form-field', {
        'form-field--full-width': fullWidth,
      })}
    >
      {title && (
        <FieldLabel
          description={description}
          htmlFor={controlId}
          title={title}
        />
      )}
      <input
        className={classNames('form-field__control', {
          'form-field__control--error': hasFieldError,
        })}
        disabled={disabled}
        id={controlId}
        placeholder={placeholder}
        type={type}
        {...register(name, { ...rest })}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <ErrorDesc message={message} />}
      />
    </div>
  );
};

export interface InputProps
  extends Omit<
    React.HtmlHTMLAttributes<HTMLInputElement>,
    'maxLength' | 'required' | 'minLength'
  >,
  FormFieldProps {
  type?: React.HTMLInputTypeAttribute;
}
