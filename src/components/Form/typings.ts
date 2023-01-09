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
