import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";
import { response, errResponse } from "../interfaces/response/response";
import { message } from "../interfaces/response/responseMessage";

export const loginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    // check e-mail
    email: Joi.string().email(),

    // length : 8 ~ 64, ASCII 테이블에 있는 문자만 입력 가능
    password: Joi.string()
      .min(8)
      .max(64)
      .regex(/^[ -~]+$/i),
  });

  // validate req.body
  const result = await schema.validateAsync(req.body);

  return result.error
    ? res.status(400).send(errResponse(message.SIGNIN_VALIDATION_FAIL))
    : next();
};
