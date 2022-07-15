import {
  GET_POST_TIMELINE_SUCCESS,
  GET_POST_TIMELINE_FAILED,
  GET_POST_TIMELINE_START,
} from './PostFeed/PostFeedActionsTypes';
import {
  POST_SHARE_START,
  POST_SHARE_SUCCESS,
  POST_SHARE_FAILED,
  POST_IMAGE_UPLOAD_START,
  POST_IMAGE_UPLOAD_SUCCESS,
  POST_IMAGE_UPLOAD_FAILED,
} from './PostShareActionTypes';

const initialState = {
  posts: [],
  loadingPosts: false,
  error: null,
  loadingImage: false,
  message: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_SHARE_START:
    case GET_POST_TIMELINE_START:
      return { ...state, loadingPosts: true, error: null };

    case POST_SHARE_SUCCESS:
    case GET_POST_TIMELINE_SUCCESS:
      return {
        ...state,
        posts: [...action.data, ...state.posts],
        loadingPosts: false,
        error: null,
      };

    case POST_SHARE_FAILED:
      // case GET_POST_TIMELINE_FAILED:
      return {
        ...state,
        loadingPosts: false,
        error: action.error || 'Post Sharing Failed. Please try again',
      };

    case GET_POST_TIMELINE_FAILED:
      return {
        ...state,
        loadingPosts: false,
        error: action.error,
      };

    case POST_IMAGE_UPLOAD_START:
      return { ...state, loadingImage: true, error: null, message: null };

    case POST_IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        loadingImage: false,
        error: null,
        message: action.data?.message || 'Post uploaded successfully',
      };

    case POST_IMAGE_UPLOAD_FAILED:
      return {
        ...state,
        loadingImage: false,
        message: null,
        error: action.error || 'Post Sharing Failed. Please try again',
      };

    default:
      return state;
  }
};

export default postReducer;
