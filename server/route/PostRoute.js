import express from 'express';
import { createPost, getPostById } from '../controller/PostController.js';

const router = express.Router();

router.post('/create', createPost);
router.get('/:id', getPostById);

export default router;
