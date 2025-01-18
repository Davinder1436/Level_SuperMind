import jwt from 'jsonwebtoken';
import { config } from '../config';

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return null;
  }
};