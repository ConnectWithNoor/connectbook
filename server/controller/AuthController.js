import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../middleware/errorHandler.js';

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
    // const accessToken = await user.generateAccessToken();
    // const refreshToken = await user.generateRefreshToken();

    // user.tokens = user.tokens.concat({ accessToken, refreshToken });
    // user.refreshTokens = user.refreshTokens.concat(refreshToken);

    await user.save();

    // return res.status(201).json({
    //   // accessToken,
    //   user,
    // });
    return res
      .status(201)
      .json({ message: `New User ${user.username} created` });
  } catch (error) {
    console.error(
      `Error: File: AuthController, func: registerUser, line: 17`,
      error
    );
    console.log(error);
    return next(ErrorHandler(error, req, res, next));
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

    user.refreshTokens = user.refreshTokens.concat(refreshToken);

    await user.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error(
      `Error: File: AuthController, func: loginUser, line: 38`,
      error
    );
    return next(ErrorHandler(error, req, res, next));
  }
};

export const logout = async (req, res, next) => {
  // onClient, also delete the access Token
  const cookies = req.cookies;
  const refreshToken = cookies?.jwt || undefined;
  if (!refreshToken) next(new ErrorResponse('', 204)); // No content;

  try {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, decordedToken) => {
        if (err) {
          res.clearCookie('jwt', {
            httpOnly: true,
            secure: true,
          });
          return next(new ErrorResponse('', 204)); //Forbidden
        }

        const user = await UserModel.findOne({
          _id: decordedToken._id,
          refreshToken,
        });

        if (!user) {
          res.clearCookie('jwt', {
            httpOnly: true,
            secure: true,
          });
          return next(new ErrorResponse('', 204)); //Forbidden
        }

        user.refreshTokens = user.refreshTokens.filter(
          (token) => token !== refreshToken
        );

        await user.save();

        res.clearCookie('jwt', {
          httpOnly: true,
          secure: true,
        });

        return res.status(204).send('');
      }
    );
  } catch (error) {
    console.error(`Error: File: AuthController, func: logout, line: 70`, error);
    return next(ErrorHandler(error, req, res, next));
  }
};

export const refreshAccessToken = async (req, res, next) => {
  const cookies = req.cookies;
  const refreshToken = cookies?.jwt || undefined;
  if (!refreshToken)
    next(new ErrorResponse('Please use a valid auth token', 401));

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err, decordedToken) => {
      if (err)
        return next(new ErrorResponse('Please use a valid auth token', 403)); //Forbidden

      const user = await UserModel.findOne({
        _id: decordedToken._id,
        refreshToken,
      });

      if (!user) {
        return next(new ErrorResponse('Please use a valid refresh token', 403)); //Forbidden
      }

      const accessToken = await user.generateAccessToken();

      return res.status(200).json({ accessToken });
    }
  );
};
