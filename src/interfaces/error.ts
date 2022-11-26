import { customErrorFactory, CustomErrorInterface, CustomErrorProperties } from 'ts-custom-error';

export type CustomError = CustomErrorInterface & CustomErrorProperties;

const TokenError = customErrorFactory(
  function TokenError(code: number, message: string) {
    this.message = message;
    this.status = 400;
    this.code = code;
  },
);
export const TOKEN_EMPTY_ERROR = new TokenError(2000, 'token is empty');
export const TOKEN_VERIFICATION_FAILURE = new TokenError(3000, 'fail to verify token');

const ValidationError = customErrorFactory(
  function ValidationError(code: number, message: string) {
    this.message = message;
    this.status = 400;
    this.code = code;
  },
);
export const SIGNUP_USER_ALREADY_EXISTS = new ValidationError(2001, 'user already exists');
export const EMAIL_NOT_EXISTS = new ValidationError(2002, 'email does not exist');
export const INVALID_PASSWORD = new ValidationError(2003, 'invalid password');
export const INVALID_FORMAT = new ValidationError(2004, 'email or password format is wrong');
export const NOT_KOREA = new ValidationError(2005, 'domain of email must be @korea.ac.kr');
export const EXPIRED_CODE = new ValidationError(2006, 'expired code');
export const CODE_ALREADY_EXISTS = new ValidationError(2007, 'code already exists');
export const CODE_NOT_AUTHED = new ValidationError(2008, 'code is not authed');

export const INVAILD_WHETHER_SCRAP = new ValidationError(3001, 'whetherScrap must be Y or N');
export const SCRAP_NOT_EXISTS = new ValidationError(3002, 'scrap does not exist');

export const CATEGORY_NAME_DOES_NOT_EXISTS = new ValidationError(4001, 'categoryName does not exists');
export const ALREADY_SUBSCRIBED = new ValidationError(4002, 'already subscribed');

const DBError = customErrorFactory(
  function DBError(code: number, message: string) {
    this.message = message;
    this.status = 400;
    this.code = code;
  },
);
export const DB_ERROR = new DBError(4000, 'database error');
