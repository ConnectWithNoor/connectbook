import jwt from 'jsonwebtoken';

import UserModel from '../model/UserModel';

export const authMiddleware = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization &&
      !req.headers.authorization.startsWith('Bearer')
    ) {
      throw new Error('Please use a valid auth token');
    }

    const token = req.header('Authorization').replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findOne({
      _id: decodedToken._id,
      'tokens.token': token,
    });

    if (!user) throw new Error('Bad auth token');
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error(`Error: File: authMiddleware, line xx`, error);

    next(error);
  }
};
