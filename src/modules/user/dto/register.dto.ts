import { RegisterProvider } from '../types/user.type';

export class RegisterDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly profileImage: File;
  readonly registerType: RegisterProvider;
}
