import type { User } from '../models/user.js';
import type { JwtPayload } from 'jsonwebtoken';

export interface DecodedToken extends JwtPayload {
  id: number;
  token: string;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
      decodedToken?: DecodedToken;
      password?: string;
      passwordHash?: string;
    }
  }
}
