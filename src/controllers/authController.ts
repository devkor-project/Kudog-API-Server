import { NextFunction, Request, Response } from "express";
import { response, errResponse } from "../interfaces/response/response";
import { message } from "../interfaces/response/responseMessage";
import * as authService from "../services/authService";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { prisma } from "../utils/util";
dotenv.config();

/**
 * 로그인 API
 * @method post
 * @url /auth/login
 * @body email, password
 * @return_data accessToken
 */
export const login = async function (req: Request, res: Response) {
  const { email, password } = req.body;

  // Look for user email in the database
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  // If user not found, send error message
  if (!user) {
    return res.status(400).send(errResponse(message.SIGNIN_EMAIL_NOT_EXISTS));
  }

  // 회원가입 API 완성되면 password 해쉬 부분 추가
  //   // Compare hased password with user password to see if they are valid
  //   const isMatch = await bcrypt.compare(password, user.password);

  //   if (!isMatch) {
  //     return res.status(401).send(errResponse(message.SIGNIN_INVALID_PASSWORD));
  //   }

  // success result
  const loginResult = await authService.login(email);

  res.send(response(message.SUCCESS, loginResult));
};
