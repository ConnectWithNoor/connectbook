import jwt from 'jsonwebtoken';
import UserModel from '../model/UserModel.js';

import ErrorResponse from '../utils/ErrorResponse.js';
import { ErrorHandler } from './errorHandler.js';

export const authMiddleware = async (req, res, next) => {
  try {
    if (
      !req.headers?.authorization &&
      !req.headers?.authorization?.startsWith('Bearer')
    ) {
      return next(new ErrorResponse('Please use a valid auth token', 401)); //Unauthorized
    }

    const accessToken = req.header('Authorization').replace('Bearer ', '');
    jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET,
      async (err, decodedToken) => {
        if (err)
          return next(new ErrorResponse('Please use a valid auth token', 403)); //Forbidden

        const user = await UserModel.findById(decodedToken.userInfo._id);

        if (!user)
          return next(new ErrorResponse('Please use a valid auth token', 403)); //Forbidden

        req.user = user;
        req.roles = user.roles;
        next();
      }
    );
  } catch (error) {
    console.error(`Error: File: authMiddleware, line 26`, error);
    return next(ErrorHandler(error, req, res, next));
  }
};
