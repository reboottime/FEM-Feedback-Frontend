import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

import FieldLabel from './FieldLabel';
import getHtmlFor from './utils';
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
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const controlId = getHtmlFor(name);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldProps = register(name, { ...rest });
  const hasFieldError = !!errors[name];

  React.useEffect(() => {
    // To remove annoying grammarly height setup
    if (textareaRef.current) {
      textareaRef.current.removeAttribute('style');
    }
  }, []);

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
        {...fieldProps}
        ref={textareaRef}
        rows={rows}
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
