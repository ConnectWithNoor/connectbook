import { AxiosAuthInstance } from '../axios/interceptors';
import { IMAGE_UPLOAD, USER_UPDATE_BY_ID } from '../constants/endpoints';

export const updateProfileCoverImageApi = (formData) => {
  return AxiosAuthInstance.post(IMAGE_UPLOAD, formData);
};

export const updateProfileInfoApi = (userId, formData) => {
  return AxiosAuthInstance.put(`${USER_UPDATE_BY_ID}${userId}`, formData);
};
