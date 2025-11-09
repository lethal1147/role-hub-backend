import { EmailTemplate } from '../types/email-template.enum';

/**
 * Base interface for all email jobs
 */
export interface EmailJobData {
  to: string;
  subject: string;
  template: EmailTemplate;
  context: Record<string, any>;
}

/**
 * Specific interface for OTP verification email
 */
export interface OtpEmailJobData extends EmailJobData {
  template: EmailTemplate.OTP_VERIFICATION;
  context: {
    name: string;
    otpCode: string;
  };
}

/**
 * Union type for all email job types
 * Add new email job interfaces here as you create them
 */
export type EmailJob = OtpEmailJobData;
// | WelcomeEmailJobData
// | PasswordResetEmailJobData
// etc.
