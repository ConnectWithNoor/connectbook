import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useRefreshToken from './hooks/useRefreshToken';
import { AxiosAuthInstance } from './axios/interceptors';

import ProtectedRoute from './route/ProtectedRoute';
import UnprotectedRoute from './route/UnProtectedRoute';
import ROUTES_LIST from './route/routes';

import './App.css';

function App() {
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

  return (
    <div className='app'>
      <div className='blur blur-1'></div>
      <div className='blur blur-2'></div>
      <Routes>
        {ROUTES_LIST.map((route) => {
          return (
            <Route
              path={route.path}
              key={route.key}
              element={
                route.isProtected ? (
                  <ProtectedRoute>
                    <route.element />
                  </ProtectedRoute>
                ) : (
                  <UnprotectedRoute>
                    <route.element />
                  </UnprotectedRoute>
                )
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
