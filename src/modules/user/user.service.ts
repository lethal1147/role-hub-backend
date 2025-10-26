import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  register(registerDto: RegisterDto) {
    console.log(registerDto);
    return 'Registered';
  }

  async getAllUser() {
    const allUsers = await this.userRepository.find();
    return allUsers;
  }
}
