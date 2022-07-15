import { ErrorHandler } from '../middleware/errorHandler.js';

export const uploadImage = (req, res, next) => {
  try {
    return res.status(200).json({
      status: true,
      message: 'image uploaded successfully',
    });
  } catch (error) {
    console.error(
      `Error: File: PostController, func: uploadImage, line: 188`,
      error
    );
    return next(ErrorHandler(error, req, res, next));
  }
};
