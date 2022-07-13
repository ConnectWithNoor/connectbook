import UserModel from '../model/UserModel.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// get a user by id;
export const getUserById = async (req, res, next) => {
  try {
    const { id: userId } = req.params;
    const user = await UserModel.findById(userId);

    if (!user) throw next(new ErrorResponse('No user found', 404));

    return res.status(200).json(user);
  } catch (error) {
    console.error(
      `Error: File: UserController, func: getUserById,  line: 15`,
      error
    );
    next(new ErrorResponse(error.message, 500));
  }
};

// update a user by Id
export const updateUserById = async (req, res, next) => {
  try {
    const { id: userIdToChange } = req.params;

    if (userIdToChange === req.user._id.toString() || req.user.isAdmn) {
      const updates = Object.keys(req.body);
      const user = await UserModel.findById(userIdToChange);

      updates.forEach((update) => (user[update] = req.body[update]));

      await user.save();

      return res.status(200).json(user);
    } else {
      return next(
        new ErrorResponse('You are not allowed to perfrom this action', 401)
      );
    }
  } catch (error) {
    console.error(
      `Error: File: UserController, func: updateUserById, line: 44`,
      error
    );
    next(new ErrorResponse(error.message, 500));
  }
};

// delete user by Id
export const deleteUserById = async (req, res, next) => {
  try {
    const { id: userIdToChange } = req.params;

    if (userIdToChange === req.user._id.toString() || req.user.isAdmn) {
      const user = await UserModel.findById(userIdToChange);
      await user.remove();
      return res
        .status(200)
        .json({ status: true, message: 'User Deleted Successfully' });
    } else {
      next(
        new ErrorResponse('You are not allowed to perfrom this action', 401)
      );
    }
  } catch (error) {
    console.error(
      `Error: File: UserController, func: deleteUserById, line: 70`,
      error
    );
    next(new ErrorResponse(error.message, 500));
  }
};

// follow a user
export const followUser = async (req, res, next) => {
  const { id: idToFollow } = req.params;
  const currentUserId = req.user._id.toString()
  
  try {
    if (idToFollow === currentUserId) {
      return next(new ErrorResponse('You cannot follow yourself.', 401));
    }

    const TofollowUser = await UserModel.findById(idToFollow);
    const followingUser = await UserModel.findById(currentUserId);

    // if the user is already following that user
    if (TofollowUser.followers.includes(currentUserId))
      return next(new ErrorResponse('You are already following the user', 400));

    TofollowUser.followers = TofollowUser.followers.concat(currentUserId);
    followingUser.following = followingUser.following.concat(idToFollow);

    await TofollowUser.save();
    await followingUser.save();

    return res.status(200).json({ status: true, message: 'User is followed' });
  } catch (error) {
    console.error(
      `Error: File: UserController, func: followUser, line: 103`,
      error
    );

    next(new ErrorResponse(error.message, 500));
  }
};

// unfollow a user
export const unFollowUser = async (req, res, next) => {
  const { id: idToFollow } = req.params;
  const currentUserId = req.user._id.toString()

  try {
    if (idToFollow === currentUserId) {
      return next(new ErrorResponse('You cannot unfollow yourself.', 401));
    }

    const toUnfollowUser = await UserModel.findById(idToFollow);
    const followingUser = await UserModel.findById(currentUserId);

    // if the user is already not following that user
    if (!toUnfollowUser.followers.includes(currentUserId))
      return next(
        new ErrorResponse('You are already not following the user', 400)
      );

    toUnfollowUser.followers = toUnfollowUser.followers.filter(
      (id) => id === currentUserId
    );
    followingUser.following = followingUser.following.filter(
      (id) => id === idToFollow
    );

    await toUnfollowUser.save();
    await followingUser.save();

    return res
      .status(200)
      .json({ status: true, message: 'User is unfollowed' });
  } catch (error) {
    console.error(
      `Error: File: UserController, func: followUser, line: 145`,
      error
    );

    next(new ErrorResponse(error.message, 500));
  }
};
