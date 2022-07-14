import jwt from 'jsonwebtoken';

import UserModel from '../model/UserModel.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const registerUser = async (req, res, next) => {
  try {
    const { username, password, firstName, lastName } = req.body;
    if (!username || !password || !firstName || !lastName)
      return next(
        new ErrorResponse('Please provide all mandatory fields', 400)
      );

    const user = new UserModel({ username, password, firstName, lastName });
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.tokens = user.tokens.concat({ accessToken, refreshToken });

    await user.save();

    return res.status(200).json({
      accessToken,
      user,
    });
  } catch (error) {
    console.error(
      `Error: File: AuthController, func: registerUser, line: 17`,
      error
    );
    return next(new ErrorResponse(error.message, 500));
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await UserModel.findByCredentials(
      req.body.username,
      req.body.password
    );

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.tokens = user.tokens.concat({ accessToken, refreshToken });

    await user.save();

    return res.status(200).json({ accessToken, user });
  } catch (error) {
    console.error(
      `Error: File: AuthController, func: loginUser, line: 38`,
      error
    );
    return next(new ErrorResponse(error.message, 500));
  }
};

export const logout = async (req, res, next) => {
  const { accessToken } = req.tokens;
  const user = req.user;

  try {
    user.tokens = user.tokens.filter(
      (token) => token.accessToken !== accessToken
    );

    await user.save();
    return res
      .status(200)
      .json({ status: true, message: 'User logged out successfully' });
  } catch (error) {
    console.error(`Error: File: AuthController, func: logout, line: 70`, error);
    return next(new ErrorResponse(error.message, 500));
  }
};

export const refreshAccessToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  // const {refreshToken, accessToken} = req.tokens;
  try {
    if (!refreshToken)
      return next(new ErrorResponse('You are not authenticated', 401));

    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await UserModel.findOne({
      _id: decodedRefreshToken._id,
      'tokens.refreshToken': refreshToken,
    });

    if (!user) {
      return next(new ErrorResponse('Please use a valid refresh token', 403));
    }

    user.tokens = user.tokens.filter(
      (token) => token.refreshToken !== refreshToken
    );

    const newAccessToken = await user.generateAccessToken();
    const newRefreshToken = await user.generateRefreshToken();

    user.tokens = user.tokens.concat({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

    await user.save();

    // return res.status(200).json({refreshTokens: newRefreshToken, accessToken: newAccessToken})
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error(
      `Error: File: AuthController, func: refreshAccessToken, line: 113`,
      error
    );

    return next(new ErrorResponse(error.message, 500));
  }
};
