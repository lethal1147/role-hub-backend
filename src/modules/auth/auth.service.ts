import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
    return 'This action adds a new auth';
  }

  register(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
}
