import { AxiosAuthInterceptor } from '../axios/interceptors';
import { USER_GET_ALL } from '../constants/endpoints';

export const getAllPersonsApi = (controller) => {
  return AxiosAuthInterceptor.get(USER_GET_ALL, {
    signal: controller.signal,
  });
};
