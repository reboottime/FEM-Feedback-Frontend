import React from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';

import { getSelectOptions } from './utils';

import { AuthContextType, useAuthContext } from '@/components/AppProviders';
import { Input, Select, Textarea } from '@/components/Form';
import { category, status } from '@/constants/feedbacks';

import './feedbackForm.style.scss';

export const FeedbackForm: React.FC<Props> = ({
  children,
  defaultValues = {},
  disabled = false,
  onSubmit,
}) => {
  const methods = useForm({
    mode: 'onChange',
    defaultValues,
  });

  const { user } = useAuthContext() as AuthContextType;
  const isAdminUser = user?.role === 'admin';

  return (
    <FormProvider {...methods}>
      <form
        className="form-page__form border-rounded--large"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Input
          description="Add a short, descriptive headline"
          disabled={disabled}
          maxLength={{
            value: 50,
            message: 'title is too long',
          }}
          name="title"
          required={{
            value: true,
            message: 'Feedback title is required',
          }}
          title="Feedback Title"
        />
        {isAdminUser && (
          <Select
            description="update feedback status"
            disabled={disabled}
            name="status"
            options={getSelectOptions(status)}
            placeholder="Please select status"
            required={{
              value: true,
              message: 'Feedback status is required',
            }}
            title="Status"
          />
        )}
        <Select
          description="Choose a category for your feedback"
          disabled={disabled}
          name="category"
          options={getSelectOptions(category)}
          placeholder="Please select category"
          required={{
            value: true,
            message: 'Feedback category is required',
          }}
          title="Category"
        />
        <Textarea
          description="Include any specific comments on what should be improved, added,
              etc."
          disabled={disabled}
          name="detail"
          required={{
            value: true,
            message: 'Feedback detail is required',
          }}
          title="Feedback Details"
        />
        {children}
      </form>
    </FormProvider>
  );
};

export interface Props {
  children: React.ReactElement;
  defaultValues?: FieldValues;
  disabled?: boolean;
  onSubmit: (data: FieldValues) => void;
  type: 'edit' | 'add';
}
