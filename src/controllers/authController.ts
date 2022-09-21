import { NextFunction, Request, Response } from "express";
import { response, errResponse } from "../interfaces/response/response";
import { message } from "../interfaces/response/responseMessage";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { logInUserDto } from "../dtos/user.dto";

import { User } from "../entities/User";
dotenv.config();

/**
 * 로그인 API
 * @method post
 * @url /auth/login
 * @body email, password
 * @return_data accessToken
 */
export const login = async function (req: Request, res: Response) {
  const userData: logInUserDto = req.body;

  // Look for user email in the database

  // to do : typeorm으로 교체
  // const user = await prisma.user.findFirst({
  //   where: {
  //     email: userData.email,
  //   },
  // });

  // If user not found, send error message
  // if (!user) {
  //   return res.status(400).send(errResponse(message.SIGNIN_EMAIL_NOT_EXISTS));
  // }

  // 회원가입 API 완성되면 password 해쉬 부분 추가
  //   // Compare hased password with user password to see if they are valid
  //   const isMatch = await bcrypt.compare(password, user.password);

  //   if (!isMatch) {
  //     return res.status(401).send(errResponse(message.SIGNIN_INVALID_PASSWORD));
  //   }

  // success result
  // const loginResult = await authService.login(userData.email);

  res.send(response(message.SUCCESS, "hi"));
};
