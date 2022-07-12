import express from 'express';

import {
  getUserById,
  updateUserById,
  deleteUserById,
  followUser,
  unFollowUser,
} from '../controller/UserController.js';

const router = express.Router();

router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unFollowUser);

export default router;
