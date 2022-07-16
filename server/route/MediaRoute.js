import express from 'express';
import { uploadMulter } from '../config/multer.js';

import { uploadImage } from '../controller/MediaController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/image/upload',
  // authMiddleware,
  uploadMulter.single('file'),
  uploadImage
);

export default router;
