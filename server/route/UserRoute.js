import express from 'express';

import { getUserById, updateUserById } from '../controller/UserController.js';

const router = express.Router();

router.get('/:id', getUserById);
router.put('/:id', updateUserById);

export default router;
