import express from 'express';

import postModel from '../model/PostModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  res.send('Post Route');
});

export default router;
