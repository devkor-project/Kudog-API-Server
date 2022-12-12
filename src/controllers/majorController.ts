import { NextFunction, Request, Response } from 'express';
import * as majorService from '@/services/majorService';

// eslint-disable-next-line import/prefer-default-export
export async function getMajors(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const getScrapsResult = await majorService.getMajors();

    res.send(getScrapsResult);
  } catch (err) {
    next(err);
  }
}
