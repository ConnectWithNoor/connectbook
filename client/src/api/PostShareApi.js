import { AxiosAuthInstance } from '../axios/interceptors';
import { POST_CREATE, IMAGE_UPLOAD } from '../constants/endpoints';

export const uploadImageApi = (data, controller) => {
  return AxiosAuthInstance.post(IMAGE_UPLOAD, data, {
    signal: controller.signal,
  });
};

export const createPostApi = (data, controller) => {
  return AxiosAuthInstance.post(POST_CREATE, data, {
    signal: controller.signal,
  });
};
