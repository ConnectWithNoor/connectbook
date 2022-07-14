import { AxiosAuthInterceptor } from '../axios/interceptors';
import { AUTH_LOGIN, AUTH_REGISTER } from '../constants/endpoints';

export const loginUserApi = (formData) => {
  return AxiosAuthInterceptor.post(AUTH_LOGIN, formData);
};

export const registerUserApi = (formData) => {
  return AxiosAuthInterceptor.post(AUTH_REGISTER, formData);
};
