const helpers = {
  auth: { 
    clearToken() {
      localStorage.removeItem('authToken');
    },
    getToken() {
      return localStorage.getItem('authToken') ?? undefined;
    },
    setToken(token:string)  {
      localStorage.setItem('authToken', token);
    },
  }
};

export default helpers;
