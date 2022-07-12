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
