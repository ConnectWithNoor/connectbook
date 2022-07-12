import mongoose from 'mongoose';
import PostModel from '../model/PostModel.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// create new Post
export const createPost = async (req, res, next) => {
  const newPost = new PostModel(req.body);

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
  const { userId } = req.body;

  try {
    const post = await PostModel.findOne({ _id: postId, userId });
    if (!post)
      return next(new ErrorResponse('No post founds. Invalid post id', 404));

    updates.forEach((update) => (post[update] = req.body[update]));
    await post.save();
    return res.status(200).json({ status: true, message: 'Post is updated' });
  } catch (error) {
    console.error(
      `Error: File: PostController, func: updatePostById, line: 46`,
      error
    );
    next(new ErrorResponse(error.message, 500));
  }
};
