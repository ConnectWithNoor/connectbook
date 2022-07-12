import express from 'express';

import {
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controller/UserController.js';

const router = express.Router();

router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
