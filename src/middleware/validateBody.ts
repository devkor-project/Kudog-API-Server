import { Request, Response, NextFunction } from 'express';
import { INVALID_FORMAT } from '@/interfaces/error';
import * as Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const loginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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
    if (result.err) throw INVALID_FORMAT;
    next();
  } catch (err) {
    next(err);
  }
};
