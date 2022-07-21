import {
  AUTH_FAILED,
  AUTH_START,
  AUTH_SUCCESS,
  LOGOUT_START,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  NEW_ACCESS_TOKEN
} from './AuthActionTypes';

import {
  UPDATE_PROFILE_COVER_IMAGE_FAILED,
  UPDATE_PROFILE_COVER_IMAGE_START,
  UPDATE_PROFILE_COVER_IMAGE_SUCCESS,
  UPDATE_PROFILE_INFO_FAILED,
  UPDATE_PROFILE_INFO_START,
  UPDATE_PROFILE_INFO_SUCCESS,
} from './ProfileModel/ProfileModelActionTypes';

import {
  FOLLOW_FAILED,
  FOLLOW_START,
  FOLLOW_SUCCESS,
  UNFOLLOW_START,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILED,
  SET_MESSAGE_NULL,
} from './Person/PersonActionTypes';

const initialState = {
  authData: null,
  loadingAuth: false,
  loadingUserProfile: false,
  error: null,
  message: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
    case LOGOUT_START:
    case FOLLOW_START:
    case UNFOLLOW_START:
      return {
        ...state,
        loadingAuth: true,
        error: null,
        loadingUserProfile: false,
        message: null,
      };
    case UPDATE_PROFILE_COVER_IMAGE_START:
    case UPDATE_PROFILE_INFO_START:
      return {
        ...state,
        loadingUserProfile: true,
        loadingAuth: false,
        error: null,
        message: null,
      };

    case AUTH_SUCCESS:
    case NEW_ACCESS_TOKEN: 
      // localStorage.setItem('profile', JSON.stringify(action.data));
      return {
        ...state,
        authData: action.data,
        loadingAuth: false,
        error: null,
        loadingUserProfile: false,
        message: null,
      };

    case LOGOUT_SUCCESS:
      // localStorage.clear();
      return {
        ...initialState,
      };

    case UPDATE_PROFILE_COVER_IMAGE_SUCCESS:
      return {
        ...state,
        loadingUserProfile: false,
        error: null,
        message: action.data?.message || 'Image updated successfully',
      };

    case UPDATE_PROFILE_INFO_SUCCESS:
      const authData = {
        ...state.authData,
        user: action.data,
      };
      return {
        ...state,
        loadingUserProfile: false,
        error: null,
        loadingAuth: false,
        message: null,
        authData,
      };

    case FOLLOW_SUCCESS:
      const userFollow = {
        ...state.authData.user,
        following: [...state.authData.user.following, action.data.idToFollow],
      };
      return {
        ...state,
        loadingUserProfile: false,
        error: null,
        loadingAuth: false,
        message: action.data.message,
        authData: {
          ...state.authData,
          user: userFollow,
        },
      };

    case UNFOLLOW_SUCCESS:
      const userUnfollow = {
        ...state.authData.user,
        following: state.authData.user.following.filter(
          (id) => id !== action.data.idToUnfollow
        ),
      };
      return {
        ...state,
        loadingUserProfile: false,
        error: null,
        loadingAuth: false,
        message: action.data.message,
        authData: {
          ...state.authData,
          user: userUnfollow,
        },
      };

    case SET_MESSAGE_NULL:
      return {
        ...state,
        message: null,
      };

    case AUTH_FAILED:
    case LOGOUT_FAILED:
    case UPDATE_PROFILE_COVER_IMAGE_FAILED:
    case UPDATE_PROFILE_INFO_FAILED:
    case FOLLOW_FAILED:
    case UNFOLLOW_FAILED:
      return {
        ...state,
        loadingAuth: false,
        error: action.error || 'Authenticated Failed. Please try again',
        loadingUserProfile: false,
        message: null,
      };
    default:
      return state;
  }
};

export default authReducer;
