import axios from 'axios';
import { BASE_URL } from '../constants/endpoints';

export const AxiosAuthInterceptor = axios.create({
  baseURL: BASE_URL,
});
