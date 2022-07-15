import { AxiosAuthInterceptor } from '../axios/interceptors';
import { POST_CREATE, IMAGE_UPLOAD } from '../constants/endpoints';

export const uploadImageApi = (data, controller) => {
  return AxiosAuthInterceptor.post(IMAGE_UPLOAD, data, {
    signal: controller.signal,
  });
};

export const uploadPostApi = (data, controller) => {
  return AxiosAuthInterceptor.post(POST_CREATE, data, {
    signal: controller.signal,
  });
};
