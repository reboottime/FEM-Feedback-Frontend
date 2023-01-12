import React, { useContext, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFunc = () => { };

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  setUser: emptyFunc
});

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<TUser>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);

export type AuthContextType = {
  setUser: (user: TUser) => void;
  user: TUser;
};

interface Props {
  children: React.ReactElement;
}

type TUser = Entities.TAuthedUser | null;
