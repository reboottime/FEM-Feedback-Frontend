import * as React from 'react';

const ErrorDesc: React.FC<ErrorDescProps> = ({ message }) => (
  <p className="form-field__error fw-regular">{message}</p>
);

interface ErrorDescProps {
  message: string;
}

export default ErrorDesc;
