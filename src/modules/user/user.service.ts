import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { R2Service } from 'src/shared/services/r2/r2.service';
import { R2_CATEGORY_NAME } from 'src/shared/services/r2/r2.constant';
import { EmailService } from '../email/email.service';
import { generateOtpData } from 'src/shared/utils/otp.util';

@Injectable()
export class UserService {
  constructor(
    private r2Service: R2Service,
    private emailService: EmailService,
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
    let profileImageUrl: string | null = null;

    if (file) {
      // Save profile image in r2
      profileImageUrl = await this.r2Service.uploadFile({
        filename: file.originalname,
        category: R2_CATEGORY_NAME['profile-image'],
        body: file.buffer,
        contentType: file.mimetype,
      });
    }
    // Generate OTP data using utility function
    const { otpCode, otpExpiresAt } = generateOtpData(10);

    const user = this.userRepository.create({
      name: registerDto.name,
      email: registerDto.email,
      password: registerDto.password,
      register_type: registerDto.registerType,
      image: profileImageUrl,
      is_email_verified: false,
      otp_code: otpCode,
      otp_expires_at: otpExpiresAt,
    });

    const savedUser = await this.userRepository.save(user);

    // Send OTP email
    await this.emailService.sendOtpEmail(
      savedUser.email,
      otpCode,
      savedUser.name,
    );

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

  async findByUsername(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
}
