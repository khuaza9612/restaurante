import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

import URL from '../server';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [client, setClient] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.decode(token);
      axios.post(`${URL}/auth/login`, { username: decodedToken.username, password: decodedToken.password }).then(({ data }) => {
        setClient(data);
      });
    }
  }, []);

  return (
    <LoginContext.Provider
      value={{
        client,
        setClient
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  return useContext(LoginContext);
};

export { LoginContext, LoginProvider };
