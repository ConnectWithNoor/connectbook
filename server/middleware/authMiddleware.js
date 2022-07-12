import jwt from 'jsonwebtoken';

import UserModel from '../model/UserModel';
import ErrorResponse from '../utils/ErrorResponse';

export const authMiddleware = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization &&
      !req.headers.authorization.startsWith('Bearer')
    ) {
      return next(new ErrorResponse('Please use a valid auth token', 401));
    }

    const accessToken = req.header('Authorization').replace('Bearer ', '');
    const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

    const user = await UserModel.findOne({
      _id: decodedToken._id,
      'accessToken.token': token,
    });

    if (!user)
      return next(new ErrorResponse('Please use a valid auth token', 401));

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error(`Error: File: authMiddleware, line 30`, error);

    return next(
      new ErrorResponse(error.message || 'You are not authorized', 401)
    );
  }
};
