import * as validator from "class-validator";

export class logInUserDto {
  @validator.IsEmail()
  public email: string;

  @validator.IsString()
  public password: string;
}
