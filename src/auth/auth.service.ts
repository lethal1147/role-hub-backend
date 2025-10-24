import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
    return 'This action adds a new auth';
  }

  register(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
}
