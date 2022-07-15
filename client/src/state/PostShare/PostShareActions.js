import { uploadImageApi } from '../../api/PostShareApi';
import {
  POST_SHARE_START,
  POST_SHARE_SUCCESS,
  POST_SHARE_FAILED,
} from './PostShareActionTypes';

export const updateImageAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: POST_SHARE_START });
    await uploadImageApi(data);
    dispatch({ type: POST_SHARE_SUCCESS });
  } catch (error) {
    dispatch({
      type: POST_SHARE_FAILED,
      error: error?.response?.data?.message,
    });

    console.error(error);
  }
};
