/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable func-names */
import JWT from 'jsonwebtoken';
import { hash, verify } from 'argon2';
import {
  EMAIL_NOT_EXISTS, NOT_KOREA, SIGNUP_USER_ALREADY_EXISTS,
  INVALID_FORMAT, INVALID_PASSWORD, EXPIRED_CODE, CODE_ALREADY_EXISTS, CODE_NOT_AUTHED,
} from '@/interfaces/error';
import User from '@/entities/User';
import EmailAuth from '@/entities/EmailAuth';
import { logInResultDto, logInUserDto, userSignupDto } from '@/interfaces/userDto';
import AppDataSource from '@/config/data-source';
import ServiceResult, { mailAuthCodeType } from '@/interfaces/common';
import logger from '@/config/winston';
import axios from 'axios';

export const login = async function (userData: logInUserDto):
  Promise<ServiceResult<logInResultDto>> {
  const { email, password } = userData;

  const findUser: User = await User.findOne({
    where: { email },
  });

  if (!findUser) {
    throw EMAIL_NOT_EXISTS;
  }

  const { userId } = findUser;

  // verify password
  const hashedPwd = findUser.password;

  if (!await verify(hashedPwd, password)) {
    throw INVALID_PASSWORD;
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

export const deleteExpiredCodes = async () => {
  try {
    const now = new Date();
    now.setHours(new Date().getHours() - 10);
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(EmailAuth)
      .where('createdAt < :now', { now })
      .execute();
  } catch (err) {
    logger.error(err);
  }
};

export const requestEmailAuth = async (email: string, type: mailAuthCodeType) => {
  const regex = /[a-z0-9]+@korea.ac.kr/;
  if (!regex.test(email)) {
    throw NOT_KOREA;
  }
  const existingMail = await EmailAuth.findOne({ where: { email } });
  const userMail = await User.findOne({ where: { email } });
  if (existingMail) {
    throw CODE_ALREADY_EXISTS;
  }
  if (type === 'signup' && userMail) {
    throw SIGNUP_USER_ALREADY_EXISTS;
  }
  if (type === 'findPwd' && !userMail) {
    throw EMAIL_NOT_EXISTS;
  }

  const authCode = Math.floor(Math.random() * 1000000);
  const codeString = authCode.toString();
  const code = '0'.repeat(6 - codeString.length).concat(codeString);
  const res = await axios.post(`${process.env.MAILER_URL}/auth`, { email, code });
  if (res.data !== 'success') {
    throw Error('unknown error');
  }

  await AppDataSource
    .createQueryBuilder()
    .insert()
    .into(EmailAuth)
    .values({
      email,
      authCode: code,
      createdAt: new Date(),
    })
    .execute();

  return { data: code };
};

export const getEmailAuthCode = async (email: string) => {
  const mail = await EmailAuth.findOne({ where: { email } });
  const now = new Date();
  now.setHours(new Date().getHours() - 10);
  if (!mail) {
    throw EMAIL_NOT_EXISTS;
  }
  if (mail.createdAt < now) {
    throw EXPIRED_CODE;
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

  const isAuthed = await EmailAuth.findOne({ where: { email: user.email } });
  if (!isAuthed.isAuthenticated) {
    throw CODE_NOT_AUTHED;
  }

  const hashedPwd = await hash((user.password));

  const newUser = await AppDataSource
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      name: user.name,
      email: user.email,
      receiveEmail: user.email,
      password: hashedPwd,
      studentID: user.studentID,
      grade: user.grade,
      major: user.major,
      categoryPerUsers: [],
      refreshToken: '', // update later
    })
    .execute();

  const userId: number = newUser.raw.insertId;

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

  return { data: logInResult };
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getAccessToken = async function (userId: number):
  Promise<ServiceResult<string>> {
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
export const checkAuth = async (email: string) => {
  await AppDataSource.createQueryBuilder()
    .update(EmailAuth)
    .set({
      isAuthenticated: true,
    })
    .where('email = :email', { email })
    .execute();
};
export const changePwd = async (email: string, pwd: string) => {
  const isAuthed = await EmailAuth.findOne({ where: { email } });
  if (!isAuthed.isAuthenticated) {
    throw CODE_NOT_AUTHED;
  }
  // number , 특수문자 하나씩 포함
  const pwdRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  if (!pwdRegex.test(pwd)) {
    throw INVALID_FORMAT;
  }

  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    throw EMAIL_NOT_EXISTS;
  }

  const hashedPwd = await hash((pwd));

  await AppDataSource.createQueryBuilder()
    .update(User)
    .set({
      password: hashedPwd,
    })
    .where('email = :email', { email })
    .execute();
};
