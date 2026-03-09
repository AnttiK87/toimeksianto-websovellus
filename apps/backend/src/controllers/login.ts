import express, { Request, Response } from 'express';

import type { LoginInput } from '@shared/index.js';

import { validateLoginInput } from '../middleware/validateInput.js';
import { asyncHandler } from '../middleware/errorHandlers.js';

import { authenticateUser, generateToken } from '../services/authService.js';
import { setSession } from '../services/sessionService.js';

const router = express.Router();

// POST /api/login
// Route for logging in
// Middlewares used:
// - validateLoginInput: validates body input
router.post(
  '/',
  validateLoginInput,
  asyncHandler(async (req: Request<object, object, LoginInput>, res: Response) => {
    const { email, password } = req.body;

    const user = await authenticateUser(email, password);
    const token = generateToken(user);

    await setSession(user.id, token);

    res.status(200).send({
      token,
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }),
);

export default router;
