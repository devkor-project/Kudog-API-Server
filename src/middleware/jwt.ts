import logger from '@/config/winston';
import { TOKEN_EMPTY_ERROR, TOKEN_VERIFICATION_FAILURE } from '@/interfaces/error';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface IPayload {
    userId: number;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) throw TOKEN_EMPTY_ERROR;
    logger.info(token);

    const secret = process.env.JWT_TOKEN_SECRET;
    const payload = jwt.verify(token, secret) as IPayload;
    req.userId = payload.userId;
    next();
  } catch (err) {
    logger.error(err.toString());
    throw TOKEN_VERIFICATION_FAILURE;
  }
};
