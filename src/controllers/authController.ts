import { NextFunction, Request, Response } from 'express';
import * as authService from '@/services/authService';
import { logInResultDto, logInUserDto, userSignupDto } from '@/interfaces/userDto';
import ServiceResult, { mailAuthCodeType } from '@/interfaces/common';
import logger from '@/config/winston';
/**
 * 로그인 API
 * @method post
 * @url /auth/login
 * @body email, password
 * @return_data accessToken
 */
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

/** authenticate email request
 * @method post
 * @url /auth/email/request
 * @query email
 * @return_data out_date or already exist error
 */
export const authMailReq = async (
  req: Request<Record<string, never>,
    Record<string, never>,
    { email: string, type: mailAuthCodeType }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, type } = req.body;
    const code = await authService.requestEmailAuth(email, type);
    res.send('success');
  } catch (err) {
    next(err);
  }
};

/** authenticate email
 * @method post
 * @url /auth/email/check
 * @body auth number
 * @return_data success or not
 */
export const authMail = async (
  req: Request<Record<string, never>, Record<string, never>, { email: string, code: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await authService.getEmailAuthCode(req.body.email);
    const authCode = data.data;
    if (req.body.code === authCode) {
      await authService.checkAuth(req.body.email);
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @method post
 * @url /auth/signup
 * @body email, pwd,
 * @return_data accessToken
 */
export const signup = async (
  req: Request<Record<string, never>, Record<string, never>, { user: userSignupDto }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.userSignUp(req.body.user);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * access token 재발급 API
 * @method post
 * @url /auth/token
 * @header refresh toekn
 * @return_data accessToken
 */
// eslint-disable-next-line import/prefer-default-export
export async function getAccessToken(
  req: any,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const accessToken = await authService.getAccessToken(userId);

    res.send(accessToken);
  } catch (err) {
    next(err);
  }
}

export const findPwd = async (
  req: Request<Record<string, never>, Record<string, never>, { email: string, pwd: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await authService.changePwd(req.body.email, req.body.pwd);
    res.json(true);
  } catch (err) {
    next(err);
  }
};

const cache = new Set();

export const reSendMail = async (
  req: Request<Record<string, never>,
    Record<string, never>,
    { email: string, type: mailAuthCodeType }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, type } = req.body;
    if (cache.has(email)) {
      throw Error('이미 인증 메일을 보냈습니다. 3분 후에 다시 시도해주세요.');
    }
    const code = await authService.reSendMail(email, type);
    cache.add(email);
    setTimeout(() => {
      cache.delete(email);
    }, 3 * 60 * 1000);
    res.send(code);
  } catch (err) {
    next(err);
  }
};
