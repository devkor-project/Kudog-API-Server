/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable func-names */
import JWT from 'jsonwebtoken';
import { EMAIL_NOT_EXISTS } from '@/interfaces/error';
import User from '@/entities/User';
import { logInResultDto, logInUserDto } from '@/dtos/userDto';
import AppDataSource from '@/config/data-source';
import ServiceResult, * as common from '@/interfaces/common';
import logger from '@/config/winston';

// eslint-disable-next-line import/prefer-default-export
export const login = async function (userData: logInUserDto):
  Promise<ServiceResult<logInResultDto>> {
  const { email, password } = userData;

  const findUser: User = await User.findOne({
    where: { email: userData.email },
  });

  if (!findUser) {
    throw EMAIL_NOT_EXISTS;
  }

  // To do : password 검증 부분 추가

  const secret = process.env.ACCESS_TOKEN_SECRET;
  // create JWT access token
  const accessToken = JWT.sign(
    { email },
    secret,
    {
      expiresIn: '30m',
    },
  );
  const refreshToken = JWT.sign(
    { email },
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
    .where('email = :email', { email })
    .execute();

  const logInResult: logInResultDto = {
    accessToken,
    refreshToken,
  };

  logger.info(logInResult.accessToken);

  return { data: logInResult };
};
