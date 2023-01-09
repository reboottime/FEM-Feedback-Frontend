import axios from '@/utils/axios';

export const signUp = (data: TUserPass) => axios.post<Entities.TAuthedUser>('/auth/sign-up', data);

export const signIn = (data: TUserPass) => axios.post<Entities.TAuthedUser>('/auth/sign-in', data);

export const getCurrentUser = () => axios.get<Entities.TAuthedUser>('/auth/metadata');

export const signOut = () => axios.get<unknown>('/auth/sign-out');
