import React, { useContext, useState } from 'react';

const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<TUser>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

interface Props {
  children: React.ReactElement;
}

type TUser = Entities.TAuthedUser | null;

export type AuthContextType = {
  setUser: (user: TUser) => void;
  user: TUser;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context) {
    return context;
  }

  throw new Error('useAuthContex should be used inside AuthProvider');
};

export default AuthProvider;
