import express, { Request, Response } from 'express';

import { tokenExtractor } from '../middleware/tokenExtractor.js';
import { userExtractor } from '../middleware/userExtractor.js';

import { deleteSessionByUserId } from '../services/sessionService.js';

import User from '../models/user.js';

const router = express.Router();

// DELETE /api/logout
// Route for logging out
// Middlewares used:
//  - tokenExtractor: extracts the token from the request header
//  - userExtractor: extracts the user from the token
router.delete('/', tokenExtractor, userExtractor, async (req: Request, res: Response) => {
  const user: User = req.user;
  await deleteSessionByUserId(user.id);

  res.status(200).json({ message: 'Kirjauduttu ulos!' });
});

export default router;
