import { AUTH_FAILED, AUTH_START, AUTH_SUCCESS } from './AuthActionTypes';

const initialState = {
  authData: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AUTH_SUCCESS:
      localStorage.setItem('profile', JSON.stringify(action.data));
      return {
        ...state,
        authData: action.data,
        loading: false,
        error: null,
      };

    case AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error.message || 'Authenticated Failed. Please try again',
      };
    default:
      return state;
  }
};

export default authReducer;
