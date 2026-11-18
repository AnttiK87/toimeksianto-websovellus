import axios from 'axios';
import loginService from './login.js';

const api = axios.create();

api.interceptors.request.use((config) => {
  const token = loginService.getToken();

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default api;
