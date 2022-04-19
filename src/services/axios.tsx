import axios from 'axios';
/**
 * Wrapper to AxiosInstance with defaults
 */
const AxiosInstance = axios.create({
  baseURL: 'https://62286b649fd6174ca82321f1.mockapi.io/case-study/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

AxiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => { return Promise.reject(error) },
);

AxiosInstance.interceptors.request.use(
  (config) => { return config },
  (error) => { return Promise.reject(error) },
);

export default AxiosInstance;
