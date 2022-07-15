import {
  GET_POST_TIMELINE_SUCCESS,
  GET_POST_TIMELINE_FAILED,
  GET_POST_TIMELINE_START,
  POST_LIKE_UNLIKE_FAILED,
  POST_LIKE_UNLIKE_START,
  POST_LIKE_UNLIKE_SUCCESS,
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
    case POST_LIKE_UNLIKE_START:
      return { ...state, loadingPosts: true, error: null, message: null };

    case POST_SHARE_SUCCESS:
    case GET_POST_TIMELINE_SUCCESS:
      const temp = [...state.posts, ...action.data];
      const uniqueArray = Array.from(new Set(temp.map(JSON.stringify))).map(
        JSON.parse
      );
      return {
        ...state,
        posts: [...uniqueArray],
        loadingPosts: false,
        error: null,
        message: null,
      };

    case POST_LIKE_UNLIKE_SUCCESS:
      const newArr = state.posts.map((item) =>
        item._id === action?.data?.post?._id ? action?.data?.post : item
      );
      return {
        ...state,
        posts: [...newArr],
        loadingPosts: false,
        error: null,
        message: action?.data?.message,
      };

    case POST_SHARE_FAILED:
      return {
        ...state,
        loadingPosts: false,
        error: action.error || 'Post Sharing Failed. Please try again',
        message: null,
      };

    case GET_POST_TIMELINE_FAILED:
    case POST_LIKE_UNLIKE_FAILED:
      return {
        ...state,
        loadingPosts: false,
        error: action.error,
        message: null,
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
