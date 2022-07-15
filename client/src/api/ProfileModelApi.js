import { AxiosAuthInterceptor } from '../axios/interceptors';
import { IMAGE_UPLOAD, USER_UPDATE_BY_ID } from '../constants/endpoints';

export const updateProfileCoverImageApi = (formData) => {
  return AxiosAuthInterceptor.post(IMAGE_UPLOAD, formData);
};

export const updateProfileInfoApi = (userId, formData) => {
  return AxiosAuthInterceptor.put(`${USER_UPDATE_BY_ID}${userId}`, formData);
};
