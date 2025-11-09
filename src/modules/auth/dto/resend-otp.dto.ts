import { IsEmail } from 'class-validator';

export class ResendOtpDto {
  @IsEmail()
  readonly email: string;
}
