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
    console.error(`Error: File: UserController, line: 40`, error);
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

// follow a user
export const followUser = async (req, res, next) => {
  const { id: idToFollow } = req.params;
  const { currentUserId } = req.body;

  try {
    if (idToFollow === currentUserId) {
      throw new Error('You cannot follow yourself.');
    }

    const TofollowUser = await UserModel.findById(idToFollow);
    const followingUser = await UserModel.findById(currentUserId);

    // if the user is already following that user
    if (TofollowUser.followers.includes(currentUserId))
      throw new Error('You are already following the user');

    TofollowUser.followers = TofollowUser.followers.concat(currentUserId);
    followingUser.following = followingUser.following.concat(idToFollow);

    await TofollowUser.save();
    await followingUser.save();

    return res.status(200).json('User is followed');
  } catch (error) {
    console.error(`Error: File: UserController, line: 73`, error);

    next(error);
  }
};

// unfollow a user
export const unFollowUser = async (req, res, next) => {
  const { id: idToFollow } = req.params;
  const { currentUserId } = req.body;

  try {
    if (idToFollow === currentUserId) {
      throw new Error('You cannot unfollow yourself.');
    }

    const toUnfollowUser = await UserModel.findById(idToFollow);
    const followingUser = await UserModel.findById(currentUserId);

    // if the user is already not following that user
    if (!toUnfollowUser.followers.includes(currentUserId))
      throw new Error('You are already not following the user');

    toUnfollowUser.followers = toUnfollowUser.followers.filter(
      (id) => id === currentUserId
    );
    followingUser.following = followingUser.following.filter(
      (id) => id === idToFollow
    );

    await toUnfollowUser.save();
    await followingUser.save();

    return res.status(200).json('User is unfollowed');
  } catch (error) {
    console.error(`Error: File: UserController, line: 121`, error);

    next(error);
  }
};
