import {
  updateProfileCoverImageApi,
  updateProfileInfoApi,
} from '../../../api/ProfileModelApi.js';
import {
  UPDATE_PROFILE_COVER_IMAGE_START,
  UPDATE_PROFILE_COVER_IMAGE_SUCCESS,
  UPDATE_PROFILE_COVER_IMAGE_FAILED,
  UPDATE_PROFILE_INFO_START,
  UPDATE_PROFILE_INFO_SUCCESS,
  UPDATE_PROFILE_INFO_FAILED,
} from './ProfileModelActionTypes';

export const updateProfileCoverImageAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_COVER_IMAGE_START });
    const { data } = await updateProfileCoverImageApi(formData);
    dispatch({ type: UPDATE_PROFILE_COVER_IMAGE_SUCCESS, data });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_COVER_IMAGE_FAILED,
      error: error?.response?.data?.message,
    });

    console.error(error);
  }
};

export const updateProfileInfoAction =
  (userId, formData) => async (dispatch) => {
    console.log('aa', formData);
    try {
      dispatch({ type: UPDATE_PROFILE_INFO_START });
      const { data } = await updateProfileInfoApi(userId, formData);
      dispatch({ type: UPDATE_PROFILE_INFO_SUCCESS, data });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_INFO_FAILED,
        error: error?.response?.data?.message,
      });

      console.error(error);
    }
  };
