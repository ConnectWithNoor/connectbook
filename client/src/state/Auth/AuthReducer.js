import {
  AUTH_FAILED,
  AUTH_START,
  AUTH_SUCCESS,
  LOGOUT_START,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
} from './AuthActionTypes';

const initialState = {
  authData: null,
  loadingAuth: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
    case LOGOUT_START:
      return {
        ...state,
        loadingAuth: true,
        error: null,
      };

    case AUTH_SUCCESS:
      localStorage.setItem('profile', JSON.stringify(action.data));
      return {
        ...state,
        authData: action.data,
        loadingAuth: false,
        error: null,
      };

    case LOGOUT_SUCCESS:
      return {
        ...initialState,
      };

    case AUTH_FAILED:
    case LOGOUT_FAILED:
      return {
        ...state,
        loadingAuth: false,
        error: action.error || 'Authenticated Failed. Please try again',
      };
    default:
      return state;
  }
};

export default authReducer;
