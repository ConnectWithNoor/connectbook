import { useDispatch } from 'react-redux';
import { generateRefreshTokenApi } from '../api/AuthApi';
import {
  NEW_ACCESS_TOKEN,
  AUTH_START,
  AUTH_FAILED,
} from '../state/Auth/AuthActionTypes';

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    dispatch({ type: AUTH_START });
    try {
      const { data } = await generateRefreshTokenApi();

      dispatch({ type: NEW_ACCESS_TOKEN, data });

      return data.accessToken;
    } catch (error) {
      console.log('eee', error);
      dispatch({ type: AUTH_FAILED, error: error.response.data.message });
      return Promise.reject(error);
    }
  };

  return refresh;
};

export default useRefreshToken;
