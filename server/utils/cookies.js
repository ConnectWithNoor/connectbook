export const clearCookies = (res) => {
  return res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
  });
};

export const setCookies = (res, refreshToken) => {
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
  });

  return;
};
