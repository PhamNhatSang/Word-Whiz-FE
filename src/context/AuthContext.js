// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [user, setUser] = useState(null); // Add user state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/api/.me');
        setUser(response.data);
      } catch (error) {
        console.error('Fetch user data failed:', error);
      }
    };

    if (accessToken) {
      fetchUserData();
    }
  }
  , [accessToken]);
  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', credentials);
      const { accessToken } = response.data;
      setAccessToken(accessToken);
      localStorage.setItem('accessToken', accessToken); // Optionally store token in localStorage
      navigate('/home'); // Navigate to home after setting the token
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, login, logout,user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
