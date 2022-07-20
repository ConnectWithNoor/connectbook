import {
  generateRefreshTokenApi,
  loginUserApi,
  logoutUserApi,
  registerUserApi,
} from '../../api/AuthApi';
import { AxiosAuthInstance } from '../../axios/interceptors';

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

    AxiosAuthInstance.interceptors.request.use((config) => {
        console.log('req.inst')
            if(!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${data.accessToken}`
            }
            return config
        }, (error) => Promise.reject(error))

        AxiosAuthInstance.interceptors.response.use((response) => response, async (error) => {
            const prevReq = error?.config;
            if(error?.response?.status === 403 && !prevReq.sent) {
              console.log('res.inst')
                prevReq.sent = true;
                const {data: {accessToken: newAccessToken}} = await generateRefreshTokenApi();
                prevReq.headers['Authorization'] = `Bearer ${newAccessToken}`
                return AxiosAuthInstance(prevReq)
            }
            return Promise.reject(error)
        })

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
