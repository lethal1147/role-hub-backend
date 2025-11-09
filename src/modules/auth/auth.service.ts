import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from '../email/email.service';
import { generateOtpData } from 'src/shared/utils/otp.util';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private emailService: EmailService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);
    const isPasswordCorrect =
      user && (await bcrypt.compare(pass, user.password));

    if (isPasswordCorrect) {
      // Check if email is verified
      if (!user.is_email_verified) {
        throw new UnauthorizedException(
          'Please verify your email before logging in',
        );
      }
      return user;
    }
    return null;
  }

  async verifyOtp(email: string, otpCode: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.is_email_verified) {
      throw new BadRequestException('Email already verified');
    }

    if (!user.otp_code || !user.otp_expires_at) {
      throw new BadRequestException('No OTP found for this user');
    }

    // Check if OTP has expired
    if (new Date() > user.otp_expires_at) {
      throw new BadRequestException('OTP has expired');
    }

    // Check if OTP matches
    if (user.otp_code !== otpCode) {
      throw new BadRequestException('Invalid OTP code');
    }

    // Mark user as verified and clear OTP fields
    user.is_email_verified = true;
    user.otp_code = null;
    user.otp_expires_at = null;

    return await this.userRepository.save(user);
  }

  async resendOtp(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.is_email_verified) {
      throw new BadRequestException('Email already verified');
    }

    // Generate new OTP data using utility function
    const { otpCode, otpExpiresAt } = generateOtpData(10);

    // Update user with new OTP
    user.otp_code = otpCode;
    user.otp_expires_at = otpExpiresAt;

    await this.userRepository.save(user);

    // Send new OTP email
    await this.emailService.sendOtpEmail(user.email, otpCode, user.name);
  }
}
