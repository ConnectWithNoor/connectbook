import { AxiosAuthInterceptor } from '../axios/interceptors';
import {
  USER_FOLLOW_BY_ID,
  USER_GET_ALL,
  USER_UNFOLLOW_BY_ID,
} from '../constants/endpoints';

export const getAllPersonsApi = (controller) => {
  return AxiosAuthInterceptor.get(USER_GET_ALL, {
    signal: controller.signal,
  });
};

export const followPersonApi = (userId) => {
  return AxiosAuthInterceptor.put(`${USER_FOLLOW_BY_ID}${userId}/follow`);
};

export const unfollowPersonApi = (userId) => {
  return AxiosAuthInterceptor.put(`${USER_UNFOLLOW_BY_ID}${userId}/unfollow`);
};
