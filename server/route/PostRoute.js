import express from 'express';
import { uploadMulter } from '../config/multer.js';
import {
  createPost,
  deletePostById,
  getPostById,
  updatePostById,
  likeOrDislikePostById,
  getTimelinePosts,
  uploadImage,
} from '../controller/PostController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createPost);
router.get('/timeline', authMiddleware, getTimelinePosts);
router.get('/:id', authMiddleware, getPostById);
router.put('/:id', authMiddleware, updatePostById);
router.put('/:id/like', authMiddleware, likeOrDislikePostById);
router.delete('/:id', authMiddleware, deletePostById);
router.post('/image/upload', uploadMulter.single('file'), uploadImage);

export default router;
