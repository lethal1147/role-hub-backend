import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import {
  EmailJobData,
  OtpEmailJobData,
} from './interfaces/email-job.interface';
import { EmailTemplate } from './types/email-template.enum';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(@InjectQueue('email') private emailQueue: Queue<EmailJobData>) {}

  /**
   * Queue an OTP verification email
   * @param email - Recipient email address
   * @param otpCode - OTP code to send
   * @param name - Recipient name
   */
  async sendOtpEmail(
    email: string,
    otpCode: string,
    name: string,
  ): Promise<void> {
    const jobData: OtpEmailJobData = {
      to: email,
      subject: 'Verify Your Email - OTP Code',
      template: EmailTemplate.OTP_VERIFICATION,
      context: {
        name,
        otpCode,
      },
    };

    try {
      const job = await this.emailQueue.add('send-email', jobData);
      this.logger.log(`OTP email job queued with ID: ${job.id} for ${email}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to queue OTP email for ${email}:`, message);
      throw error;
    }
  }

  /**
   * Generic method to queue any email
   * Can be used for future email types
   */
  async queueEmail(jobData: EmailJobData): Promise<void> {
    try {
      const job = await this.emailQueue.add('send-email', jobData);
      this.logger.log(`Email job queued with ID: ${job.id} for ${jobData.to}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to queue email for ${jobData.to}:`, message);
      throw error;
    }
  }
}
