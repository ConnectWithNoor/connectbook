import {useEffect} from 'react'
import { useSelector } from 'react-redux';
import {Outlet} from 'react-router-dom'

import useRefreshToken from '../../hooks/useRefreshToken';
import { AxiosAuthInstance } from '../../axios/interceptors';

const AxiosAuthIntercept = () => {

    const refresh = useRefreshToken();
  const { accessToken } = useSelector(
    (state) => state?.authReducer?.authData || ''
  );

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
          const newAccessToken  = await refresh();
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


  return <Outlet />
}

export default AxiosAuthIntercept