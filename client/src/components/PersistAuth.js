import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useRefreshToken from '../hooks/useRefreshToken';

const PersistAuth = () => {
  const [isLoading, setisLoading] = useState(true);
  const refresh = useRefreshToken();
  const { accessToken } = useSelector(
    (state) => state.authReducer.authData || ''
  );

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setisLoading(false);
      }
    };
    !accessToken ? verifyRefreshToken() : setisLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isLoading ? '' : <Outlet />}</>;
};

export default PersistAuth;
