import { NextFunction, Request, Response } from 'express';
import prisma from '@/utils/prisma';
import * as authService from '@/services/authService';
import { EMAIL_NOT_EXISTS } from '@/interfaces/error';
/**
 * 로그인 API
 * @method post
 * @url /auth/login
 * @body email, password
 * @return_data accessToken
 */
// eslint-disable-next-line import/prefer-default-export
export function login(
  req: Request<Record<string, never>, Record<string, never>, { email: string, password: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;

    // ***** 여기 userService로 분리하는 거 어떨까요 ? - error throw 부분까지 분리 가능
    // Look for user email in the database
    /*
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    }); */
    const user = 1;

    // If user not found, send error message
    if (!user) {
      throw EMAIL_NOT_EXISTS;
    }

    //   // Compare hased password with user password to see if they are valid
    //   const isMatch = await bcrypt.compare(password, user.password);

    //   if (!isMatch) {
    //     return res.status(401).send(errResponse(message.SIGNIN_INVALID_PASSWORD));
    //   }

    // login 성공 result
    const loginResult = authService.login(email);

    res.send(loginResult);
  } catch (err) {
    next(err);
  }
}
