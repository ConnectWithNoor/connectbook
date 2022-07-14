import { AUTH_FAILED, AUTH_START, AUTH_SUCCESS } from './AuthActionTypes';

const initialState = {
  authData: null,
  loadingAuth: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
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

    case AUTH_FAILED:
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
