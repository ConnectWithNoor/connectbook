import { AxiosAuthInstance } from '../axios/interceptors';
import {
  POST_GET_TIMELINE,
  POST_LIKE_UNLIKE_BY_ID,
} from '../constants/endpoints';

export const getPostFeedTimelineApi = (controller) => {
  return AxiosAuthInstance.get(POST_GET_TIMELINE, {
    signal: controller.signal,
  });
};

export const LikeUnlikePostApi = (postId, controller) => {
  return AxiosAuthInstance.put(`${POST_LIKE_UNLIKE_BY_ID}/${postId}/like`, {
    signal: controller.signal,
  });
};
