import { NextFunction, Request, Response } from 'express';
import * as authService from '@/services/authService';
import { logInResultDto, logInUserDto } from '@/dtos/userDto';
import ServiceResult from '@/interfaces/common';
import logger from '@/config/winston';
/**
 * 로그인 API
 * @method post
 * @url /auth/login
 * @body email, password
 * @return_data accessToken
 */
// eslint-disable-next-line import/prefer-default-export
export async function login(
  req: Request<Record<string, never>, Record<string, never>, { email: string, password: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const userData: logInUserDto = req.body;
    const loginResult = await authService.login(userData);

    res.send(loginResult);
  } catch (err) {
    next(err);
  }
}
