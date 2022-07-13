import jwt from 'jsonwebtoken';

import UserModel from '../model/UserModel.js';
import ErrorResponse from '../utils/ErrorResponse.js';


export const registerUser = async (req, res, next) => {
  try {
    const { username, password, firstName, lastName } = req.body;
    const user = new UserModel({ username, password, firstName, lastName });
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.accessTokens = user.accessTokens.concat({ token: accessToken });
    user.refreshTokens = user.refreshTokens.concat({ token: refreshToken });

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

    user.accessTokens = user.accessTokens.concat({ token: accessToken });
    user.refreshTokens = user.refreshTokens.concat({ token: refreshToken });
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


export const refreshAccessToken = async (req, res, next) => {
  try {
    const {refreshToken} = req.body;
    
    if(!refreshToken) return next(new ErrorResponse('You are not authenticated', 401));
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await UserModel.findOne({
      _id: decodedRefreshToken._id,
      'refreshTokens.token': refreshToken,
    });

    if (!user)
      return next(new ErrorResponse('Please use a valid refresh token', 403));

      user.refreshTokens = user.refreshTokens.filter(token => token === refreshToken);

      const newAccessToken = await user.generateAccessToken();
      const newRefreshToken = await user.generateRefreshToken(); 
      
      user.accessTokens = user.accessTokens.concat({ token: newAccessToken });
      user.refreshTokens = user.refreshTokens.concat({ token: newRefreshToken });

      await user.save();

    return res.status(200).json({refreshTokens: newRefreshToken, accessToken: newAccessToken})
  } catch (error) {
    console.error(
      `Error: File: AuthController, func: refreshAccessToken, line: 84`,
      error
    );
    return next(new ErrorResponse(error.message, 500));
    
  }
 
}