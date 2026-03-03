import { Request, Response, NextFunction } from 'express';

import { AppError } from '../errors/AppError.js';

import { userInfoUpdateSchema } from '../schemas/index.js';

// handle and validate user information update
// returns object with validated and updated info to controller
export const handleUserInfoChange = (req: Request, _res: Response, next: NextFunction) => {
  const parsed = userInfoUpdateSchema.parse(req.body);
  const { username, name, email } = parsed;

  const changes: Partial<typeof req.user> = {};

  if (username !== req.user.username) changes.username = username;
  if (name !== req.user.name) changes.name = name;
  if (email !== req.user.email) changes.email = email;

  if (Object.keys(changes).length === 0) {
    throw new AppError({ fi: 'Et muuttanut tietoja', en: 'No changes provided' }, 400);
  }

  Object.assign(req.user, changes);
  next();
};
