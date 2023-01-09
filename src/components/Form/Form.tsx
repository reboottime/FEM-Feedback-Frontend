import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import getHtmlFor from './utils';

import './style.scss';

const FieldLabel: React.FC<FieldLabelProps> = ({
  description,
  htmlFor,
  title,
}) => (
  <label
    className="form-field__label"
    htmlFor={htmlFor}
  >
    <span className="form-field__label-text fw-bold">{title}</span>
    {description && (
      <p className="form-field__label-desc fw-regular">{description}</p>
    )}
  </label>
);

const ErrorDesc: React.FC<ErrorDescProps> = ({ message }) => (
  <p className="form-field__error fw-regular">{message}</p>
);

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

  const controlId = getHtmlFor(name);

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
// Please refer https://react-hook-form.com/advanced-usage/#SmartFormComponent
export interface FormFieldProps {
  description?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  maxLength?: {
    message: string;
    value: number;
  };
  minLength?: {
    message: string;
    value: number;
  };
  name: string;
  placeholder?: string;
  required?: {
    message: string;
    value: true;
  };
  title?: string;
}

interface FieldLabelProps
  extends Pick<FormFieldProps, 'title' | 'description'> {
  htmlFor: string;
}

export interface InputProps
  extends Omit<
    React.HtmlHTMLAttributes<HTMLInputElement>,
    'maxLength' | 'required' | 'minLength'
  >,
  FormFieldProps {
  type?: React.HTMLInputTypeAttribute;
}

interface ErrorDescProps {
  message: string;
}
