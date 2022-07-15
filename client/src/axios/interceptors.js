import axios from 'axios';
import { BASE_URL } from '../constants/endpoints';

export const AxiosAuthInterceptor = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const axiosPublicInterceptor = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});
