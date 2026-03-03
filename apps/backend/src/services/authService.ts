import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AppError } from '../errors/AppError.js';

import { SECRET } from '../utils/config.js';

import { getUserByEmail } from '../services/userService.js';

import User from '../models/user.js';

export const authenticateUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  const passwordCorrect = user?.passwordHash
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

  if (!user || !passwordCorrect) {
    throw new AppError({ en: 'invalid email or password' }, 401);
  }

  return user;
};

export const generateToken = (user: User): string => {
  return jwt.sign({ email: user.email, id: user.id }, SECRET, {
    expiresIn: '4h',
  });
};
