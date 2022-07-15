import { getPostFeedTimelineApi } from '../../api/PostFeedApi';
import {
  GET_POST_TIMELINE_FAILED,
  GET_POST_TIMELINE_START,
  GET_POST_TIMELINE_SUCCESS,
} from './PostFeedActionsTypes';

export const getPostFeedTimelineAction =
  (id, controller) => async (dispatch) => {
    dispatch({ type: GET_POST_TIMELINE_START });

    try {
      const { data } = await getPostFeedTimelineApi(id, controller);
      dispatch({ type: GET_POST_TIMELINE_SUCCESS, data });
    } catch (error) {
      dispatch({
        type: GET_POST_TIMELINE_FAILED,
        error: error?.response?.data?.message,
      });
      console.error(error);
    }
  };
