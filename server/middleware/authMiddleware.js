import jwt from 'jsonwebtoken';

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
    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, decodedToken) => {

    if(err) return next(new ErrorResponse('Please use a valid auth token', 403)); //Forbidden

    req.user = decodedToken._id;
    next();

    });

  } catch (error) {
    console.error(`Error: File: authMiddleware, line 26`, error);
    return next(ErrorHandler(error, req, res, next));
  }
};