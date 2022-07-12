import UserModel from '../model/UserModel.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const registerUser = async (req, res, next) => {
  try {
    const { username, password, firstName, lastName } = req.body;
    const user = new UserModel({ username, password, firstName, lastName });

    await user.save();
    const token = await user.generateAuthToken();
    return res.status(200).json({
      token,
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

    const token = await user.generateAuthToken();
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(
      `Error: File: AuthController, func: loginUser, line: 38`,
      error
    );
    return next(new ErrorResponse(error.message, 500));
  }
};
