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

// Delete a post
