import express from 'express';
import { createPost } from '../controller/PostController.js';

import postModel from '../model/PostModel.js';

const router = express.Router();

router.post('/create', createPost);

export default router;
