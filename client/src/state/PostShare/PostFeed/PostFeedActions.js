import {
  getPostFeedTimelineApi,
  LikeUnlikePostApi,
} from '../../../api/PostFeedApi';
import {
  GET_POST_TIMELINE_FAILED,
  GET_POST_TIMELINE_START,
  GET_POST_TIMELINE_SUCCESS,
  POST_LIKE_UNLIKE_START,
  POST_LIKE_UNLIKE_SUCCESS,
  POST_LIKE_UNLIKE_FAILED,
} from './PostFeedActionsTypes';

export const getPostFeedTimelineAction = (controller) => async (dispatch) => {
  dispatch({ type: GET_POST_TIMELINE_START });

  try {
    const { data } = await getPostFeedTimelineApi(controller);
    dispatch({ type: GET_POST_TIMELINE_SUCCESS, data });
  } catch (error) {
    dispatch({
      type: GET_POST_TIMELINE_FAILED,
      error: error?.response?.data?.message,
    });
    console.error(error);
  }
};

export const LikeUnlikePostAction =
  (postId, controller) => async (dispatch) => {
    dispatch({ type: POST_LIKE_UNLIKE_START });

    try {
      const { data } = await LikeUnlikePostApi(postId, controller);
      dispatch({ type: POST_LIKE_UNLIKE_SUCCESS, data });
    } catch (error) {
      dispatch({
        type: POST_LIKE_UNLIKE_FAILED,
        error: error?.response?.data?.message,
      });
      console.error(error);
    }
  };
