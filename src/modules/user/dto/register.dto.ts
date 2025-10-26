import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { REGISTER_TYPE } from '../constants/user.constant';

export class RegisterDto {
  @IsString()
  @MaxLength(100)
  readonly name: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsOptional()
  readonly profileImage: File;

  @IsEnum(REGISTER_TYPE)
  readonly registerType: REGISTER_TYPE;
}
