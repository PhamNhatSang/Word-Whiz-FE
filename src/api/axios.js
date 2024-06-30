// src/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL_DEV, // Replace with your API base URL
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken'); // Get token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
