import {useDispatch} from 'react-redux'
import { generateRefreshTokenApi } from '../api/AuthApi';
import { NEW_ACCESS_TOKEN, AUTH_START, AUTH_FAILED } from '../state/Auth/AuthActionTypes';

const useRefreshToken = () => {
  const dispatch = useDispatch();


  const refresh = async () => {
      dispatch({type: AUTH_START })
    try {
      const { data } = await generateRefreshTokenApi();
      dispatch({type: NEW_ACCESS_TOKEN, data: data.accessToken})
      return data.accessToken;
      
    } catch (error) {
      dispatch({type: AUTH_FAILED, error})
      return Promise.reject(error);
    }
  };

  return refresh;
};

export default useRefreshToken;
