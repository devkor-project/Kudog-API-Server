import JWT from 'jsonwebtoken';
import prisma from '../utils/prisma';

// eslint-disable-next-line import/prefer-default-export
export const login = function (email: string) {
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
  /*
const updateUser = await prisma.user.update({
  where: {
    email,
  },
  data: {
    refreshToken,
  },
}); */

  return { accessToken, refreshToken };
};
