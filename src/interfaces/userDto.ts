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
