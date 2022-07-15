import { AxiosAuthInterceptor } from '../axios/interceptors';
import { POST_GET_TIMELINE } from '../constants/endpoints';

export const getPostFeedTimelineApi = (data, controller) => {
  return AxiosAuthInterceptor.post(POST_GET_TIMELINE, data, {
    signal: controller.signal,
  });
};
