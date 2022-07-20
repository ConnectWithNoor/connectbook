import axios from 'axios';
import { BASE_URL } from '../constants/endpoints';

export const AxiosAuthInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  // timeout: 5000,
});

export const AxiosPublicInstance = axios.create({
  baseURL: BASE_URL,
  // timeout: 5000,
});
