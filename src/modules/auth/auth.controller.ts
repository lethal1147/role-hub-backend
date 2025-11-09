import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { responseHandler } from 'src/shared/handlers/response.handler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const user = await this.authService.verifyOtp(
      verifyOtpDto.email,
      verifyOtpDto.otp_code,
    );
    return responseHandler({
      message: 'Email verified successfully',
      success: true,
      statusCode: 200,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        is_email_verified: user.is_email_verified,
      },
    });
  }

  @Post('resend-otp')
  async resendOtp(@Body() resendOtpDto: ResendOtpDto) {
    await this.authService.resendOtp(resendOtpDto.email);
    return responseHandler({
      message: 'OTP has been resent to your email',
      success: true,
      statusCode: 200,
    });
  }
}
