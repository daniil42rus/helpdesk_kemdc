import axios from 'axios';
export const local = axios.create({
  // baseURL: 'http://10.23.4.11:3002/api',
  baseURL: 'http://localhost:3002/api',
});
local.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});
// export default local
