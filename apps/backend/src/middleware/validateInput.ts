import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { AppError } from '../errors/AppError.js';

import { loginSchema, userInputSchema, passwordSchema } from '../schemas/index.js';

export const validateLoginInput = (req: Request, _res: Response, next: NextFunction) => {
  const parsedlogin = loginSchema.parse(req.body);
  req.body = parsedlogin;
  next();
};

export const validatePasswordChange = async (req: Request, _res: Response, next: NextFunction) => {
  const { oldPassword, newPassword1, newPassword2 } = req.body;
  const user = req.user;

  const passwordCorrect = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!passwordCorrect) {
    throw new AppError('Salasana on väärin', 401);
  }

  passwordSchema.parse({ oldPassword, newPassword1, newPassword2 });

  const passwordHash = await bcrypt.hash(newPassword1, 10);
  user.passwordHash = passwordHash;

  next();
};

export const validateNewUserInput = (req: Request, _res: Response, next: NextFunction) => {
  const parsedNewUser = userInputSchema.parse(req.body);
  req.body = parsedNewUser;
  next();
};
