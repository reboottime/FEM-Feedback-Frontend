import React from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';

import { PAGE_INFO } from './constants';
import { getSelectOptions } from './utils';

import { useAuthContext } from '@/components/AppProviders';
import { Input, Select, Textarea } from '@/components/Form';

import { category, status } from '@/constants/feedbacks';
import { isAdminUser as currentUserIsAdmin } from '@/utils/user';
import { isPublishedFeedback as feedbackIsPublished } from '@/utils/feedback';

import './style.scss';

const categoryOptions = getSelectOptions(category);
const statusOptions = getSelectOptions(status.filter((item) => item !== 'new'));

export const FeedbackForm: React.FC<Props> = ({
  children,
  defaultValues = {},
  disabled: isFormDisabled = false,
  onSubmit,
  type,
}) => {
  const methods = useForm({
    mode: 'onChange',
    defaultValues,
  });

  const { user } = useAuthContext();

  const isAdminUser = currentUserIsAdmin(user);

  const isEditting = (type === 'edit');
  const isPublishedFeedback = feedbackIsPublished(defaultValues as Entities.Feedback.TFeedback);
  const disabled = isPublishedFeedback || isFormDisabled;

  return (
    <FormProvider {...methods}>
      <form
        className="form-page__form border-rounded--large"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <h1 className="form-page__title">
          {type === 'add'
            ? PAGE_INFO[type].title
            : `${isPublishedFeedback
              ? ''
              : 'Edit'}
              "${defaultValues.title}"`}
        </h1>
        <Input
          description="Add a short, descriptive headline"
          disabled={disabled || (isAdminUser && isEditting)}
          maxLength={{
            value: 50,
            message: 'title is too long',
          }}
          name="title"
          placeholder="Please input feedback title"
          required={{
            value: true,
            message: 'Feedback title is required',
          }}
          title="Feedback Title"
        />
        {(isAdminUser && (type === 'edit')) && (
          <Select
            description="update feedback status"
            disabled={isPublishedFeedback}
            name="status"
            options={statusOptions}
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
          disabled={disabled || (isAdminUser && isEditting)}
          name="category"
          options={categoryOptions}
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
          disabled={disabled || (isAdminUser && isEditting)}
          maxLength={{
            value: 500,
            message: 'Feedback detail is too long'
          }}
          name="detail"
          placeholder="Please type feedback detail"
          required={{
            value: true,
            message: 'Feedback detail is required',
          }}
          title="Feedback Details"
        />
        {!isPublishedFeedback && <div className="form-page__buttons">{children}</div>}
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
