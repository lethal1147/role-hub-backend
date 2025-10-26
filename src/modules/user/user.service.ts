import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { R2Service } from 'src/shared/services/r2/r2.service';
import { R2_CATEGORY_NAME } from 'src/shared/services/r2/r2.constant';

@Injectable()
export class UserService {
  constructor(
    private r2Service: R2Service,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto, file: Express.Multer.File) {
    // Check unique user email
    const existUser = await this.userRepository.findOneBy({
      email: registerDto.email,
    });
    if (existUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Save profile image in r2
    const profileImageUrl = await this.r2Service.uploadFile({
      filename: file.originalname,
      category: R2_CATEGORY_NAME['profile-image'],
      body: file.buffer,
      contentType: file.mimetype,
    });

    const user = this.userRepository.create({
      name: registerDto.name,
      email: registerDto.email,
      password: registerDto.password,
      register_type: registerDto.registerType,
      image: profileImageUrl,
    });

    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async getAllUser() {
    const allUsers = await this.userRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });
    return allUsers;
  }
}
