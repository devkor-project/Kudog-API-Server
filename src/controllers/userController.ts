import { NextFunction, Request, Response } from 'express';
import * as userService from '@/services/userService';
import { userInfoDto } from '@/interfaces/userDto';

export const getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userInfo = await userService.getUserInfo(req.userId);
    res.send(userInfo);
  } catch (err) {
    next(err);
  }
};
export const modifyUserInfo = async (
  req: Request<Record<string, never>, Record<string, never>, { info: userInfoDto }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await userService.modifyUserInfo(req.userId, req.body.info);
    res.send(result);
  } catch (err) {
    next(err);
  }
};
