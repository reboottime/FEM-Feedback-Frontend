import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

import FieldLabel from './FieldLabel';
import useControllId from './useControllId';
import { FormFieldProps } from './typings';
import ErrorDesc from './ErrorDesc';

export const Textarea: React.FC<TextareaProps> = ({
  description,
  disabled,
  fullWidth = true,
  name,
  placeholder = 'Please input',
  title,
  rows = 3,
  ...rest
}) => {
  const controlId = useControllId(name);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldProps = register(name, { ...rest });

  const hasFieldError = !!errors[name];

  React.useEffect(() => {
    const textarea = document.querySelector(`#${controlId}`);

    if (textarea) {
      textarea.removeAttribute('style');
    }
  }, [controlId]);

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
      <TextareaAutosize
        className={classNames('form-field__control', {
          'form-field__control--error': !!hasFieldError,
        })}
        disabled={disabled}
        id={controlId}
        placeholder={placeholder}
        rows={rows}
        {...fieldProps}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <ErrorDesc message={message} />}
      />
    </div>
  );
};

interface TextareaProps
  extends Omit<React.HtmlHTMLAttributes<HTMLTextAreaElement>, 'maxLength' | 'required' | 'minLength' | 'onChange'>,
  FormFieldProps {
  onChange?: (value: string) => void;
  rows?: number;
}
