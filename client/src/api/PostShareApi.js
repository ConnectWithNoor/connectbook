import { AxiosAuthInterceptor } from '../axios/interceptors';
import { POST_CREATE, POST_IMAGE_UPLOAD } from '../constants/endpoints';

export const uploadImageApi = (data) => {
  return AxiosAuthInterceptor.post(POST_IMAGE_UPLOAD, data);
};

export const uploadPostApi = (data) => {
  return AxiosAuthInterceptor.post(POST_CREATE, data);
};
