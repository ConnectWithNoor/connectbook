import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Outlet, Navigate, useLocation} from 'react-router-dom'

import useRefreshToken from '../hooks/useRefreshToken';
import { AxiosAuthInstance } from '../axios/interceptors';
import { LOGOUT_SUCCESS } from '../state/Auth/AuthActionTypes';

const AxiosAuthIntercept = () => {

  const [redirect, setRedirect] = useState(false)
  const location = useLocation();
  const dispatch = useDispatch()

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
        if(error?.response?.status === 401) {
          dispatch({type: LOGOUT_SUCCESS, error: 'Authenticated Failed. Please try again'})
          setRedirect(true);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      AxiosAuthInstance.interceptors.request.eject(request);
      AxiosAuthInstance.interceptors.response.eject(response);
      setRedirect(false);
    };
  }, [accessToken, refresh, dispatch]);


  return redirect ? <Navigate to="/" state={{from: location}} replace /> : <Outlet />
}

export default AxiosAuthIntercept