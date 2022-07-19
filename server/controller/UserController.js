import { ErrorHandler } from '../middleware/errorHandler.js';
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
      `Error: File: UserController, func: getUserById,  line: 16`,
      error
    );
    return next(ErrorHandler(error, req, res, next));
  }
};

// update a user by Id
export const updateUserById = async (req, res, next) => {
  try {
    const { id: userIdToChange } = req.params;
    const allowedOptions = [
      'username',
      'password',
      'firstName',
      'lastName',
      'profilePicture',
      'coverPicture',
      'about',
      'livesIn',
      'worksAt',
      'country',
      'relationshipStatus',
      'followers',
      'following',
    ];

    if (userIdToChange === req.user._id.toString() || req.user.isAdmin) {
      const updates = Object.keys(req.body);
      const user = await UserModel.findById(userIdToChange);

      updates.forEach((update) => {
        if (allowedOptions.includes(update)) {
          user[update] = req.body[update];
        }
      });

      // only one admin can make another admin
      if (updates['isAdmin'] && req.user.isAdmin) {
        user['isAdmin'] = req.body['isAdmin'];
      }

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
    return next(ErrorHandler(error, req, res, next));
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
      `Error: File: UserController, func: deleteUserById, line: 93`,
      error
    );
    return next(ErrorHandler(error, req, res, next));
  }
};

// follow a user
export const followUser = async (req, res, next) => {
  const { id: idToFollow } = req.params;
  const currentUserId = req.user._id.toString();

  try {
    if (idToFollow === currentUserId) {
      return next(new ErrorResponse('You cannot follow yourself.', 401));
    }

    const TofollowUser = await UserModel.findById(idToFollow);
    const followingUser = req.user;

    // if the user is already following that user
    if (followingUser.following.includes(idToFollow))
      return next(new ErrorResponse('You are already following the user', 401));

    TofollowUser.followers = TofollowUser.followers.concat(currentUserId);
    followingUser.following = followingUser.following.concat(idToFollow);

    await TofollowUser.save();
    await followingUser.save();

    return res
      .status(200)
      .json({ status: true, message: 'User is followed', idToFollow });
  } catch (error) {
    console.error(
      `Error: File: UserController, func: followUser, line: 103`,
      error
    );

    return next(ErrorHandler(error, req, res, next));
  }
};

// unfollow a user
export const unFollowUser = async (req, res, next) => {
  const { id: idToUnfollow } = req.params;
  const currentUserId = req.user._id.toString();

  try {
    if (idToUnfollow === currentUserId) {
      return next(new ErrorResponse('You cannot unfollow yourself.', 401));
    }

    const toUnfollowUser = await UserModel.findById(idToUnfollow);
    const followingUser = req.user;

    // if the user is already not following that user
    if (!followingUser.following.includes(idToUnfollow))
      return next(
        new ErrorResponse('You are already not following the user', 401)
      );

    toUnfollowUser.followers = toUnfollowUser.followers.filter(
      (id) => id.toString() !== currentUserId
    );
    followingUser.following = followingUser.following.filter(
      (id) => id.toString() !== idToUnfollow
    );

    await toUnfollowUser.save();
    await followingUser.save();

    return res
      .status(200)
      .json({ status: true, message: 'User is unfollowed', idToUnfollow });
  } catch (error) {
    console.error(
      `Error: File: UserController, func: followUser, line: 170`,
      error
    );

    return next(ErrorHandler(error, req, res, next));
  }
};

export const getAllUsers = async (req, res, next) => {
  const userId = req.user._id;
  try {
    // get all users except the one called the function;
    const users = await UserModel.find({ _id: { $nin: userId } });

    return res.status(200).json(users);
  } catch (error) {
    console.error(
      `Error: File: UserController, func: getAllUsers, line: 170`,
      error
    );

    return next(ErrorHandler(error, req, res, next));
  }
};
