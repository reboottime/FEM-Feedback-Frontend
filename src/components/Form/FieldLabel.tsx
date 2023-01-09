import * as React from 'react';

import { FormFieldProps } from './typings';

const FieldLabel: React.FC<FieldLabelProps> = ({
  description,
  htmlFor,
  title,
}) => (
  <label className="form-field__label"
    htmlFor={htmlFor}>
    <span className="form-field__label-text fw-bold">{title}</span>
    {description && (
      <p className="form-field__label-desc fw-regular">{description}</p>
    )}
  </label>
);

export default FieldLabel;

export interface FieldLabelProps
  extends Pick<FormFieldProps, 'title' | 'description'> {
  htmlFor: string;
}
