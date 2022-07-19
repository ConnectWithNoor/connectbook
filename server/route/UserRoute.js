import express from 'express';

import {
  getUserById,
  updateUserById,
  deleteUserById,
  followUser,
  unFollowUser,
  getAllUsers,
} from '../controller/UserController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import verifyRolesMiddleware from '../middleware/verifyRolesMiddleware.js';
import { ROLES_LIST } from '../utils/RolesList.js';

const router = express.Router();

router.get('/', authMiddleware, getAllUsers);
router.get('/:id', getUserById);
router.put(
  '/:id',
  authMiddleware,
  verifyRolesMiddleware(ROLES_LIST.admin, ROLES_LIST.user),
  updateUserById
);
router.delete(
  '/:id',
  authMiddleware,
  verifyRolesMiddleware(ROLES_LIST.admin, ROLES_LIST.user),
  deleteUserById
);

router.put('/:id/follow', authMiddleware, followUser);
router.put('/:id/unfollow', authMiddleware, unFollowUser);

export default router;
