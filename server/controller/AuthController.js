import UserModel from '../model/UserModel.js';

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
    console.error(`Error: File: AuthController, line: 11`, error);
    return next(error);
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

    return res.status(200).json({ user, token });
  } catch (error) {
    console.error(`Error: File: AuthController, line: 25`, error);
    return next(error);
  }
};
