/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable func-names */
import JWT from 'jsonwebtoken';
import { hash } from 'argon2';
import {
  EMAIL_NOT_EXISTS, NOT_KOREA, SIGNUP_USER_ALREADY_EXISTS, INVALID_FORMAT,
} from '@/interfaces/error';
import User from '@/entities/User';
import EmailAuth from '@/entities/EmailAuth';
import { logInResultDto, logInUserDto, userSignupDto } from '@/interfaces/userDto';
import AppDataSource from '@/config/data-source';
import ServiceResult, * as common from '@/interfaces/common';
import logger from '@/config/winston';

export const login = async function (userData: logInUserDto):
  Promise<ServiceResult<logInResultDto>> {
  const { email, password } = userData;

  const findUser: User = await User.findOne({
    where: { email },
  });

  const { userId } = findUser;

  // To do : password 검증 부분 추가

  const secret = process.env.JWT_TOKEN_SECRET;
  // create JWT access token
  const accessToken = JWT.sign(
    { userId },
    secret,
    {
      expiresIn: '30m',
    },
  );
  const refreshToken = JWT.sign(
    { userId },
    secret,
    {
      expiresIn: '30d',
    },
  );

  // update refreshToken
  await AppDataSource.createQueryBuilder()
    .update(User)
    .set({
      refreshToken,
    })
    .where('userId = :userId', { userId })
    .execute();

  const logInResult: logInResultDto = {
    accessToken,
    refreshToken,
  };

  logger.info(logInResult.accessToken);

  return { data: logInResult };
};

export const requestEmailAuth = async (email: string) => {
  const regex = /[a-z0-9]+@korea.ac.kr/;
  if (!regex.test(email)) {
    throw NOT_KOREA;
  }
  const existingMail = await EmailAuth.findOne({ where: { email } });
  if (existingMail) {
    throw SIGNUP_USER_ALREADY_EXISTS;
  }

  const authCode = Math.floor(Math.random() * 1000000);
  const codeString = authCode.toString();
  const code = '0'.repeat(6 - codeString.length).concat(codeString);

  await AppDataSource
    .createQueryBuilder()
    .insert()
    .into(EmailAuth)
    .values({
      email,
      authCode: code,
      // expiresAt:
    })
    .execute();
  // TODO : scheduler
  return { data: code };
};

export const getEmailAuthCode = async (email: string) => {
  const mail = await EmailAuth.findOne({ where: { email } });
  if (!mail) {
    throw EMAIL_NOT_EXISTS;
  }
  return {
    data: mail.authCode,
  };
};

export const userSignUp = async (user: userSignupDto):
  Promise<ServiceResult<logInResultDto>> => {
  const mailRegex = /[a-z0-9]+@korea.ac.kr/;
  if (!mailRegex.test(user.email)) {
    throw NOT_KOREA;
  }

  // number , 특수문자 하나씩 포함
  const pwdRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  if (!pwdRegex.test(user.password)) {
    throw INVALID_FORMAT;
  }

  const existingUser = await User.findOne({ where: { email: user.email } });
  if (existingUser) {
    throw SIGNUP_USER_ALREADY_EXISTS;
  }

  // TODO : email 인증 Check logic

  const hashedPwd = await hash((user.password));

  const secret = process.env.ACCESS_TOKEN_SECRET;
  // create JWT access token
  const accessToken = JWT.sign(
    { email: user.email },
    secret,
    {
      expiresIn: '30m',
    },
  );
  const refreshToken = JWT.sign(
    { email: user.email },
    secret,
    {
      expiresIn: '30d',
    },
  );

  await AppDataSource
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      email: user.email,
      receiveEmail: user.email,
      password: hashedPwd,
      studentID: user.studentID,
      grade: user.grade,
      major: user.major,
      categoryPerUsers: [],
      refreshToken,
    })
    .execute();

  const logInResult: logInResultDto = {
    accessToken,
    refreshToken,
  };

  logger.info(logInResult.accessToken);

  return { data: logInResult };
};

export const getAccessToken = async function (userId: number):
  Promise<ServiceResult<string>> {
  const findUser = await User.findOne({
    where: { userId },
  });

  if (!findUser) {
    throw EMAIL_NOT_EXISTS;
  }

  const secret = process.env.JWT_TOKEN_SECRET;
  // create JWT access token
  const accessToken = JWT.sign(
    { userId },
    secret,
    {
      expiresIn: '30m',
    },
  );

  logger.info(accessToken);

  return { data: accessToken };
};
