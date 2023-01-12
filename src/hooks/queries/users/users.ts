import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { QUERY_KEY_USER_DATA } from './queryKey';

import { AuthContextType, queryClient, useAuthContext } from '@/components/AppProviders';

import userApi from '@/services/users.service';

import helpers from '@/utils/helpers';

export const useSignInUser = () => {
  const { setUser } = useAuthContext() as AuthContextType;

  return useMutation(userApi.signIn, {
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

  return useMutation(userApi.signUp, {
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
    queryFn: userApi.getCurrent,
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

  return useMutation(userApi.signOut, {
    onSuccess: () => {
      helpers.auth.clearToken();
      setUser(null);
      queryClient.invalidateQueries(QUERY_KEY_USER_DATA);

      toast.info('You have logined out');
    },
  });
};

