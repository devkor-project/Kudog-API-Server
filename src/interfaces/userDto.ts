/* eslint-disable max-classes-per-file */
import { IsEmail, IsString } from 'class-validator';

export class logInUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class logInResultDto {
  @IsString()
  public accessToken: string;

  @IsString()
  public refreshToken: string;
}

export interface userSignupDto {
  email: string;
  receivingMail: string;
  password: string;
  studentID: number;
  grade: number;
  name: string;
  major: string;
}

export interface userInfoDto {
  name: string;
  status: 'Y' | 'N';
  email: string;
  receiveEmail: string;
  studentID: number;
  grade: number;
  major: string;
}
