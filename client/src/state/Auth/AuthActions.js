import { loginUserApi, registerUserApi } from '../../api/AuthApi';
import { AUTH_FAILED, AUTH_START, AUTH_SUCCESS } from './AuthActionTypes';

export const loginUserAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_START });
    const { data } = await loginUserApi(formData);

    dispatch({ type: AUTH_SUCCESS, data });
  } catch (error) {
    dispatch({ type: AUTH_FAILED, error: error.response.data.message });
    console.error(error);
  }
};

export const registerUserAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_START });
    const { data } = await registerUserApi(formData);

    dispatch({ type: AUTH_SUCCESS, data });
  } catch (error) {
    dispatch({ type: AUTH_FAILED, error: error.response.data.message });
    console.error(error);
  }
};
