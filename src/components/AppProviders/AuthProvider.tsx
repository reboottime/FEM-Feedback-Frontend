import React, { useContext, useState } from 'react';

export type AuthContextType = {
  setUser: (user: Entities.TAuthedUser | null) => void;
  user: Entities.TAuthedUser | null;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<Entities.TAuthedUser | null>(null);

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

export const useAuthContext = () => {
  return useContext(AuthContext);
};
