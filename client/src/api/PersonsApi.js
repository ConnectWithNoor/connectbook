import { AxiosAuthInstance, AxiosPublicInstance } from '../axios/interceptors';
import {
  USER_FOLLOW_BY_ID,
  USER_GET_ALL,
  USER_GET_BY_ID,
  USER_UNFOLLOW_BY_ID,
} from '../constants/endpoints';

export const getAllPersonsApi = (controller) => {
  return AxiosAuthInstance.get(USER_GET_ALL, {
    signal: controller.signal,
  });
};

export const getPersonByIdApi = (id, controller) => {
  return AxiosPublicInstance.get(`${USER_GET_BY_ID}${id}`, {
    signal: controller?.signal || undefined,
  });
};

export const followPersonApi = (userId) => {
  return AxiosAuthInstance.put(`${USER_FOLLOW_BY_ID}${userId}/follow`);
};

export const unfollowPersonApi = (userId) => {
  return AxiosAuthInstance.put(`${USER_UNFOLLOW_BY_ID}${userId}/unfollow`);
};
