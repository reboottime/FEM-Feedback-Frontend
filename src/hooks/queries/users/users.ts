import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QUERY_KEY_USER_DATA } from './queryKey';

import { AuthContextType, useAuthContext } from '@/components/AppProviders';

import {
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from '@/services/users';

import helpers from '@/utils/helpers';

export const useSignInUser = () => {
  const { setUser } = useAuthContext() as AuthContextType;

  return useMutation(signIn as never, {
    onError: () => {
      toast.error('Signed in failed, please check your username and password');
    },
    onSuccess: (userData: Entities.TAuthedUser) => {
      helpers.auth.setToken(userData.accessToken);
      setUser(userData);
    },
  });
};

export const useSignUpUser = () => {
  const { setUser } = useAuthContext() as AuthContextType;

  return useMutation(signUp as never, {
    onError: () => {
      toast.error('Failed to sign up');
    },
    onSuccess: (userData: Entities.TAuthedUser) => {
      helpers.auth.setToken(userData.accessToken);
      setUser(userData);

      toast.info('Signed up');
    },
  });
};

export const useGetCurrentUser = () => {
  const { setUser } = useAuthContext() as AuthContextType;

  return useQuery({
    queryFn: getCurrentUser,
    queryKey: QUERY_KEY_USER_DATA,
    retry: 0,
    onSuccess: (userData: Entities.TAuthedUser) => {
      setUser(userData);
    },
    onError: () => {
      setUser(null);
    }
  });
};

export const useSignOutUser = () => {
  const { setUser } = useAuthContext() as AuthContextType;

  return useMutation(signOut, {
    onSuccess: () => {
      helpers.auth.clearToken();
      setUser(null);

      toast.info('You have logined out');
    }
  });
};

