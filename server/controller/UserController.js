import UserModel from '../model/UserModel.js';

// get a user by id;

export const getUserById = async (req, res, next) => {
  try {
    const { id: userId } = req.params;
    const user = await UserModel.findById(userId);

    if (!user) throw new Error('No user found');

    return res.status(200).json(user);
  } catch (error) {
    console.error(`Error: File: UserController, line: 14`, error);

    next(error);
  }
};

// update a user by Id

export const updateUserById = async (req, res, next) => {
  try {
    const { id: userIdToChange } = req.params;
    const { currentUserId, currentAdminStatus } = req.body;

    if (userIdToChange === currentUserId || currentAdminStatus) {
      const updates = Object.keys(req.body);
      const user = await UserModel.findById(userIdToChange);

      updates.forEach((update) => (user[update] = req.body[update]));

      await user.save();

      return res.status(200).json(user);
    } else {
      throw new Error('You are not allowed to perfrom this action');
    }
  } catch (error) {
    console.error(`Error: File: UserController, line: 25`, error);
    next(error);
  }
};

// delete user by Id

export const deleteUserById = async (req, res, next) => {
  try {
    const { id: userIdToChange } = req.params;
    const { currentUserId, currentAdminStatus } = req.body;

    if (userIdToChange === currentUserId || currentAdminStatus) {
      const user = await UserModel.findById(userIdToChange);
      await user.remove();
      return res.status(200).json({ message: 'User Deleted Successfully' });
    } else {
      throw new Error('You are not allowed to perfrom this action');
    }
  } catch (error) {
    next(error);
  }
};
