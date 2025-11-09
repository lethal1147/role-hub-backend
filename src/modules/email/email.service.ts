import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import * as path from 'path';
import mjml2html from 'mjml';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtpEmail(
    email: string,
    otpCode: string,
    name: string,
  ): Promise<void> {
    // Read MJML template
    const mjmlTemplate = fs.readFileSync(
      path.join(__dirname, 'templates', 'otp-verification.mjml'),
      'utf-8',
    );

    // Replace placeholders
    const mjmlWithData = mjmlTemplate
      .replace(/{{name}}/g, name)
      .replace(/{{otpCode}}/g, otpCode);

    // Convert MJML to HTML
    const { html } = mjml2html(mjmlWithData);

    // Send email
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify Your Email - OTP Code',
      html,
    });
  }
}
