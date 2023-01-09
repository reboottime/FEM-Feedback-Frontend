import classNames from 'classnames';
import * as React from 'react';

import FieldLabel from './FieldLabel';
import getHtmlFor from './utils';
import { FormFieldProps } from './typings';

export const Textarea: React.FC<TextareaProps> = ({
  description,
  fullWidth = true,
  name,
  title,
}) => {
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
    </div>
  );
};

export interface TextareaProps
  extends Omit<
    React.HtmlHTMLAttributes<HTMLInputElement>,
    'maxLength' | 'required' | 'minLength'
  >,
  FormFieldProps {
  type?: React.HTMLInputTypeAttribute;
}
