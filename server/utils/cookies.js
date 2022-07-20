export const clearCookies = (res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  
};

export const setCookies = (res, refreshToken) => {
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
  });

  return;
};
