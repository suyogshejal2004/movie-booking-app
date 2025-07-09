import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    const saved = await AsyncStorage.getItem('user');
    const parsed = saved ? JSON.parse(saved) : null;

    if (parsed && parsed.email === email && parsed.password === password) {
      setUser(parsed);
      return true;
    }
    return false;
  };

  const register = async (email, password) => {
    const newUser = { email, password };
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
