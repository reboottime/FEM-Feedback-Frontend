import React, { useRef, useState } from 'react';

import { AUTH_REMINDER_TEXT } from './constants';

import AuthForm, { AuthFormProps } from '@/components/AuthForm';
import { AuthContextType, useAuthContext } from '@/components/AppProviders';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

import {
  useSignInUser,
  useSignUpUser,
} from '@/hooks/queries/users';

import './style.scss';

export const RequireAuth: React.FC<Props> = ({
  actionName,
  children,
}) => {
  const { user } = useAuthContext() as AuthContextType;

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [authType, setAuthType] = useState<AuthFormProps['type']>('signIn');

  const signUpMutation = useSignUpUser();
  const signInMutation = useSignInUser();

  const handleModaCloselRef = useRef(() => {
    setModalIsOpen(false);
  });

  const handleSwitchButtonClick: React.MouseEventHandler = (e) => {
    e.preventDefault();

    setAuthType((authType === 'signIn')
      ? 'signUp'
      : 'signIn');
  };

  const handleSubmit: AuthFormProps['onSubmit'] = (data) => {
    if (authType === 'signIn') {
      signInMutation.mutate(data);
    } else {
      signUpMutation.mutate(data);
    }
  };

  if (user) {
    return children;
  }

  if (modalIsOpen) {
    const {
      modalTitle,
      reminderText,
      submitButtonText,
      switchButtonText
    } = AUTH_REMINDER_TEXT[authType];

    const authModal = (
      <Modal
        key="authModal"
        maxWidth="420px"
        onClose={handleModaCloselRef.current}
        title={modalTitle}
      >
        <div className="require-auth">
          <AuthForm onSubmit={handleSubmit}
            type={authType}>
            <Button>{submitButtonText}</Button>
          </AuthForm>
          <p className="require-auth__reminder-text">
            <span>{reminderText}</span>
            <button
              className="require-auth__switch-button"
              onClick={handleSwitchButtonClick}
            >
              {switchButtonText}
            </button>
          </p>
        </div>
      </Modal>);

    return (
      <React.Fragment>
        {children}
        {authModal}
      </React.Fragment>
    );
  }

  const newChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      ...child.props,
      [actionName]: () => {
        setModalIsOpen(true);
      },
    })
  );

  return newChildren[0];
};

export interface Props {
  actionName: string; // The action that requires check authentication
  children: React.ReactElement;
  onAuthenticated?: () => void;
}
