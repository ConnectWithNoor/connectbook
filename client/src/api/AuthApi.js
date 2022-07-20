import { AxiosAuthInstance } from '../axios/interceptors';
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_NEW_REFRESH_TOKEN,
  AUTH_REGISTER,
} from '../constants/endpoints';

export const loginUserApi = (formData, controller) => {
  return AxiosAuthInstance.post(AUTH_LOGIN, formData, {
    signal: controller.signal,
  });
};

export const registerUserApi = (formData, controller) => {
  return AxiosAuthInstance.post(AUTH_REGISTER, formData, {
    signal: controller.signal,
  });
};

export const logoutUserApi = (controller) => {
  return AxiosAuthInstance.get(AUTH_LOGOUT, {
    signal: controller.signal,
  });
};

export const generateRefreshTokenApi = () => {
  return AxiosAuthInstance.get(AUTH_NEW_REFRESH_TOKEN);
};
