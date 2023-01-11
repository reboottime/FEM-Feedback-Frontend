import React, { useContext, useState } from 'react';

const AuthContext = React.createContext<AuthContextType | null>(null);

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

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context) {
    return context;
  }

  throw new Error('useAuthContext should be used inside AuthProvider');
};

export type AuthContextType = {
  setUser: (user: TUser) => void;
  user: TUser;
};

interface Props {
  children: React.ReactElement;
}

type TUser = Entities.TAuthedUser | null;
