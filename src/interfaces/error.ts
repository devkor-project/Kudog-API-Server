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

export const INVAILD_WHETHER_SCRAP = new ValidationError(2006, 'whetherScrap must be Y or N');
export const SCRAP_NOT_EXISTS = new ValidationError(2007, 'scrap does not exist');

const DBError = customErrorFactory(
  function DBError(code: number, message: string) {
    this.message = message;
    this.status = 400;
    this.code = code;
  },
);
export const DB_ERROR = new DBError(4000, 'database error');
