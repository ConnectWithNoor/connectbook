import { followPersonApi, unfollowPersonApi } from '../../../api/PersonsApi';
import {
  FOLLOW_FAILED,
  FOLLOW_START,
  FOLLOW_SUCCESS,
  UNFOLLOW_START,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILED,
} from './PersonActionTypes';

export const followPersonAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: FOLLOW_START });
    const { data } = await followPersonApi(userId);

    dispatch({ type: FOLLOW_SUCCESS, data });
  } catch (error) {
    dispatch({ type: FOLLOW_FAILED, error: error?.response?.data?.message });
    console.error(error);
  }
};

export const unfollowPersonAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: UNFOLLOW_START });
    const { data } = await unfollowPersonApi(userId);

    dispatch({ type: UNFOLLOW_SUCCESS, data });
  } catch (error) {
    dispatch({
      type: UNFOLLOW_FAILED,
      error: error?.response?.data?.message,
    });
    console.error(error);
  }
};
