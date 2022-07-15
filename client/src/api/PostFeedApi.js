import { AxiosAuthInterceptor } from '../axios/interceptors';
import { POST_GET_TIMELINE } from '../constants/endpoints';

export const getPostFeedTimelineApi = (controller) => {
  return AxiosAuthInterceptor.get(POST_GET_TIMELINE, {
    signal: controller.signal,
  });
};
