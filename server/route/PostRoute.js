import express from 'express';
import {
  createPost,
  getPostById,
  updatePostById,
} from '../controller/PostController.js';

const router = express.Router();

router.post('/create', createPost);
router.get('/:id', getPostById);
router.put('/:id', updatePostById);

export default router;
