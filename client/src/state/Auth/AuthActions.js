import {
  loginUserApi,
  logoutUserApi,
  registerUserApi,
} from '../../api/AuthApi';
import { AxiosAuthInterceptor } from '../../axios/interceptors';
import {
  AUTH_FAILED,
  AUTH_START,
  AUTH_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_START,
  LOGOUT_SUCCESS,
} from './AuthActionTypes';

export const loginUserAction = (formData, controller) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_START });
    const { data } = await loginUserApi(formData, controller);

    AxiosAuthInterceptor.defaults.headers = {
      Authorization: `Bearer ${data.accessToken}`,
    };

    dispatch({ type: AUTH_SUCCESS, data });
  } catch (error) {
    dispatch({ type: AUTH_FAILED, error: error?.response?.data?.message });
    console.error(error);
  }
};

export const registerUserAction =
  (formData, controller) => async (dispatch) => {
    try {
      dispatch({ type: AUTH_START });
      const { data } = await registerUserApi(formData, controller);

      AxiosAuthInterceptor.defaults.headers = {
        Authorization: `Bearer ${data.accessToken}`,
      };

      dispatch({ type: AUTH_SUCCESS, data });
    } catch (error) {
      dispatch({ type: AUTH_FAILED, error: error?.response?.data?.message });
      console.error(error);
    }
  };

export const logoutUserAction = (controller) => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_START });
    const { data } = await logoutUserApi(controller);
    dispatch({ type: LOGOUT_SUCCESS, data });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILED, error: error?.response?.data?.message });
    console.error(error);
  }
};
