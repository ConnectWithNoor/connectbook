import { uploadImageApi, uploadPostApi } from '../../api/PostShareApi';
import {
  POST_SHARE_START,
  POST_SHARE_SUCCESS,
  POST_SHARE_FAILED,
  POST_IMAGE_UPLOAD_START,
  POST_IMAGE_UPLOAD_SUCCESS,
  POST_IMAGE_UPLOAD_FAILED,
} from './PostShareActionTypes';

export const updateImageAction = (formData, controller) => async (dispatch) => {
  try {
    dispatch({ type: POST_IMAGE_UPLOAD_START });
    const { data } = await uploadImageApi(formData, controller);
    dispatch({ type: POST_IMAGE_UPLOAD_SUCCESS, data });
  } catch (error) {
    dispatch({
      type: POST_IMAGE_UPLOAD_FAILED,
      error: error?.response?.data?.message,
    });

    console.error(error);
  }
};

export const updatePostAction = (formData, controller) => async (dispatch) => {
  try {
    dispatch({ type: POST_SHARE_START });
    const { data } = await uploadPostApi(formData, controller);
    dispatch({ type: POST_SHARE_SUCCESS, data });
  } catch (error) {
    dispatch({
      type: POST_SHARE_FAILED,
      error: error?.response?.data?.message,
    });

    console.error(error);
  }
};
