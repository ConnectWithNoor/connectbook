import express from 'express';
import {
  createPost,
  deletePostById,
  getPostById,
  updatePostById,
  likeOrDislikePostById,
} from '../controller/PostController.js';

const router = express.Router();

router.post('/create', createPost);
router.get('/:id', getPostById);
router.put('/:id', updatePostById);
router.put('/:id/like', likeOrDislikePostById);
router.delete('/:id', deletePostById);

export default router;
