import { AxiosAuthInterceptor } from '../axios/interceptors';
import { POST_IMAGE_UPLOAD } from '../constants/endpoints';

export const uploadImageApi = (data) => {
  return AxiosAuthInterceptor.post(POST_IMAGE_UPLOAD, data);
};
