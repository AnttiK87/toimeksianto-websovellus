import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';
import User from '../models/user.js';

export const userFinder = async (req: Request, _res: Response, next: NextFunction) => {
  const { id } = req.params;

  const user = await User.findByPk(Number(id));

  if (!user) {
    return next(new AppError({ en: 'User not found' }, 404));
  }

  req.user = user;
  next();
};
