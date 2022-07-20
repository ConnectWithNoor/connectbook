import jwt_decode from 'jwt-decode';

export const decodeJwtToken = (token) => {
  const { exp, userInfo } = jwt_decode(token);

  const isExpired = Date.now() > exp * 1000;

  return {
    isExpired,
    userInfo,
  };
};
