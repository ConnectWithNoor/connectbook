import mongoose from 'mongoose';
import PostModel from '../model/PostModel.js';
import UserModel from '../model/UserModel.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// create new Post
export const createPost = async (req, res, next) => {
  const userId = req.user._id.toString();
  const {description} = req.body;
  
  const newPost = new PostModel({userId, description});

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    console.error(
      `Error: File: PostController, func: createPost, line: 14`,
      error
    );
    next(new ErrorResponse(error.message, 500));
  }
};

// Get a post by id
export const getPostById = async (req, res, next) => {
  const { id: postId } = req.params;
  try {
    const post = await PostModel.findById(postId);

    if (!post)
      return next(new ErrorResponse('No post founds. Invalid post id', 404));

    return res.status(200).json(post);
  } catch (error) {
    console.error(
      `Error: File: PostController, func: getPostById, line: 33`,
      error
    );
    next(new ErrorResponse(error.message, 500));
  }
};

// update a post by id
export const updatePostById = async (req, res, next) => {
  const { id: postId } = req.params;
  const updates = Object.keys(req.body);
  const userId = req.user._id.toString()

  try {
    const post = await PostModel.findOne({ _id: postId, userId });
    if (!post)
      return next(new ErrorResponse('No post found. Invalid post id', 404));

    updates.forEach((update) => (post[update] = req.body[update]));
    await post.save();
    return res.status(200).json({ status: true, message: 'Post is updated' });
  } catch (error) {
    console.error(
      `Error: File: PostController, func: updatePostById, line: 56`,
      error
    );
    next(new ErrorResponse(error.message, 500));
  }
};

// delete a post by id
export const deletePostById = async (req, res, next) => {
  const { id: postId } = req.params;
  const userId = req.user._id.toString()

  try {
    const post = await PostModel.findOne({ _id: postId, userId });
    if (!post)
      return next(new ErrorResponse('No post founds. Invalid post id', 404));

    await post.remove();

    return res
      .status(200)
      .json({ status: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error(
      `Error: File: PostController, func: deletePostById, line: 80`,
      error
    );
    next(new ErrorResponse(error.message, 500));
  }
};

// like/dislike a post by Id
export const likeOrDislikePostById = async (req, res, next) => {
  const { id: postId } = req.params;
  const userId = req.user._id.toString()

  try {
    const post = await PostModel.findById(postId);
    const user = await UserModel.findById(userId);

    if (!post || !user)
      return next(new ErrorResponse('Not allowed to perform this action', 401));

    if (!post.likes.includes(userId)) {
      //   if post isn't liked by the user. Like it
      post.likes = post.likes.concat(userId);
      await post.save();
      return res
        .status(200)
        .json({ status: true, message: 'Post liked successfully' });
    } else {
      //   if post is already liked by the user. Unlike it
      post.likes = post.likes.filter((id) => id === userId);
      await post.save();
      return res
        .status(200)
        .json({ status: true, message: 'Post unliked successfully' });
    }
  } catch (error) {
    console.error(
      `Error: File: PostController, func: deletePostById, line: 116`,
      error
    );
    next(new ErrorResponse(error.message, 500));
  }
};

// get timelime posts
export const getTimelinePosts = async (req, res, next) => {
  const userId = req.user._id.toString()

  try {
    const postIdsSet = new Set([]);
    const user = await UserModel.findById(userId);
    postIdsSet.add(user.id);

    user.following.forEach((id) => postIdsSet.add(id.toString()));
    const postIdsArray = Array.from(postIdsSet);

    const allPosts = await PostModel.find({ userId: postIdsArray })
      .populate('userId', 'username firstName lastName _id')
      .sort({ createdAt: -1 });

    return res.status(200).json(allPosts);

    // by using aggregation pipeline

    // const currentUserPosts = await PostModel.find({ userId });
    // const postsByFollowings = await UserModel.aggregate([
    //   {
    //     $match: {
    //       _id: new mongoose.Types.ObjectId(userId),
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'posts',
    //       localField: 'following',
    //       foreignField: 'userId',
    //       as: 'postsByFollowings',
    //     },
    //   },
    //   {
    //     $project: {
    //       postsByFollowings: 1,
    //       _id: 0,
    //     },
    //   },
    // ]);
    // return res
    //   .status(200)
    //   .json([...currentUserPosts, ...postsByFollowings[0].postsByFollowings]);
  } catch (error) {
    console.error(
      `Error: File: PostController, func: getTimelinePosts, line: 170`,
      error
    );
    next(new ErrorResponse(error.message, 500));
  }
};
