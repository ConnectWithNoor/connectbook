import multer from 'multer';
import { ErrorHandler } from '../middleware/errorHandler.js';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      if (file.mimetype.includes('image')) {
        return cb(null, 'public/images');
      } else {
        return cb(new Error('Only images are allowed'), null);
      }
    } catch (error) {
      return next(ErrorHandler(error, req, res, next));
    }
  },
  filename: (req, file, cb) => {
    try {
      if (file.mimetype.includes('image')) {
        return cb(null, req.body.name);
      } else {
        return cb(new Error('Only images are allowed'), null);
      }
    } catch (error) {
      return next(ErrorHandler(error, req, res, next));
    }
  },
});

export const uploadMulter = multer({ storage: multerStorage });
