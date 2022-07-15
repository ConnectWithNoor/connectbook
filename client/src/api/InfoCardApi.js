import { axiosPublicInterceptor } from '../axios/interceptors';
import { USER_GET_BY_ID } from '../constants/endpoints';

export const getUserByIdApi = (id, controller) => {
  return axiosPublicInterceptor.post(`${USER_GET_BY_ID}${id}`, {
    signal: controller.signal,
  });
};
