import { loginUserApi, registerUserApi } from '../../api/AuthApi';
import { AxiosAuthInterceptor } from '../../axios/interceptors';
import { AUTH_FAILED, AUTH_START, AUTH_SUCCESS } from './AuthActionTypes';

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

      dispatch({ type: AUTH_SUCCESS, data });
    } catch (error) {
      dispatch({ type: AUTH_FAILED, error: error?.response?.data?.message });
      console.error(error);
    }
  };
