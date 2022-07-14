import express from 'express';

import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logout,
} from '../controller/AuthController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/refresh', refreshAccessToken);
router.get('/logout', authMiddleware, logout);

export default router;
