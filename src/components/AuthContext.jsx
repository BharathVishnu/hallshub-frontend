import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  const setAuthenticatedUser = (newUsername) => {
    setUsername(newUsername);
  };

  const logout = () => {
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ username, setAuthenticatedUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};