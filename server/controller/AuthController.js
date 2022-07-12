import UserModel from '../model/UserModel.js';

export const registerUser = async (req, res, next) => {
  try {
    const { username, password, firstName, lastName } = req.body;
    const newUser = new UserModel({ username, password, firstName, lastName });

    await newUser.save();
    return res.status(200).json(newUser);
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

    // add Jwt Token

    return res.status(200).json({ user });
  } catch (error) {
    console.error(`Error: File: AuthController, line: 25`, error);
    return next(error);
  }
};
