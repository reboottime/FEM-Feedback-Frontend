import axios from 'axios';

import helpers from './helpers';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

// https://axios-http.com/docs/interceptors
axios.interceptors.request.use(function (config) {

  config.headers = {
    authorization: `Bearer ${helpers.auth.getToken()}`,
    ...config.headers,
  } as Record<string, string | undefined>;

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const { success, data, message } = response.data;
  
  if (success) {
    return data;
  } else {
    Promise.reject(new Error(message));
  }
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});


export default axios;
