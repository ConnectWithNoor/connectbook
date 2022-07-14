import { AxiosAuthInterceptor } from '../axios/interceptors';
import { AUTH_LOGIN, AUTH_REGISTER } from '../constants/endpoints';

export const loginUserApi = (formData, controller) => {
  return AxiosAuthInterceptor.post(AUTH_LOGIN, formData, {
    signal: controller.signal,
  });
};

export const registerUserApi = (formData, controller) => {
  return AxiosAuthInterceptor.post(AUTH_REGISTER, formData, {
    signal: controller.signal,
  });
};
