import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import { useSelector } from 'react-redux';
import { AxiosAuthInstance } from '../axios/interceptors';

const useAxiosAuth = () => {
  const refresh = useRefreshToken();
  const { accessToken } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const request = AxiosAuthInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const response = AxiosAuthInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevReq = error?.config;

        if (error?.response?.status === 403 && !prevReq.sent) {
          prevReq.sent = true;
          const { accessToken: newAccessToken } = await refresh();
          prevReq.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return AxiosAuthInstance(prevReq);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      AxiosAuthInstance.interceptors.request.eject(request);
      AxiosAuthInstance.interceptors.response.eject(response);
    };
  }, [accessToken, refresh]);

  return AxiosAuthInstance;
};

export default useAxiosAuth;
