// src/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // ako budeš koristio Sanctum auth
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axiosInstance;