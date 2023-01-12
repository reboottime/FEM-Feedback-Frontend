import { AxiosRequestConfig } from 'axios';

import { Api } from '@/utils/api';

type TUser = Entities.TAuthedUser;

class UserApi extends Api {
  constructor(config: AxiosRequestConfig) {
    super(config);
  }

  signUp: (data: TUserPass) => Promise<TUser> = (data) => {
    return this.post('/sign-up', data);
  };

  signIn: (data: TUserPass) => Promise<TUser> = (data) => {
    return this.post('/sign-in', data);
  };

  getCurrent: () => Promise<TUser> = () => {
    return this.get('/metadata');
  };

  signOut: () => Promise<never> = () => {
    return this.get('/sign-out');
  };
}

const userApi = new UserApi({
  timeout: 1000,
  baseURL: import.meta.env.VITE_API_BASE_URL + '/auth',
});

export default userApi;
