import express from 'express';

import {
  getUserById,
  updateUserById,
  deleteUserById,
  followUser,
  unFollowUser,
} from '../controller/UserController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/:id', getUserById);
router.put('/:id', authMiddleware ,updateUserById);
router.delete('/:id', authMiddleware,deleteUserById);

router.put('/:id/follow', authMiddleware, followUser);
router.put('/:id/unfollow',authMiddleware, unFollowUser);

export default router;
