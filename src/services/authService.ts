import { NextFunction, Request, Response } from "express";
import { response, errResponse } from "../interfaces/response/response";
import { message } from "../interfaces/response/responseMessage";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { prisma } from "../utils/util";
dotenv.config();

export const login = async function (email: string) {
  // create JWT access token
  const accessToken = await JWT.sign(
    { email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30m",
    }
  );
  const refreshToken = await JWT.sign(
    { email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );

  const updateUser = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      refreshToken: refreshToken,
    },
  });

  return { accessToken, refreshToken };
};
