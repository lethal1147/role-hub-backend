import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import * as path from 'path';
import * as ejs from 'ejs';
import mjml2html from 'mjml';
import { EmailJobData } from '../interfaces/email-job.interface';

@Processor('email')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(private readonly mailerService: MailerService) {
    super();
  }

  async process(job: Job<EmailJobData>): Promise<void> {
    this.logger.log(`Processing email job ${job.id} to ${job.data.to}`);

    try {
      // Read MJML template
      const templatePath = path.join(
        __dirname,
        '..',
        'templates',
        `${job.data.template}.mjml`,
      );

      this.logger.debug(`Looking for template at: ${templatePath}`);
      this.logger.debug(`__dirname is: ${__dirname}`);

      if (!fs.existsSync(templatePath)) {
        throw new Error(`Template not found: ${job.data.template} at path: ${templatePath}`);
      }

      const mjmlTemplate = fs.readFileSync(templatePath, 'utf-8');

      // Process template with EJS
      const mjmlWithData = ejs.render(mjmlTemplate, job.data.context);

      // Convert MJML to HTML
      const { html, errors } = mjml2html(mjmlWithData);

      if (errors && errors.length > 0) {
        this.logger.warn('MJML conversion warnings:', errors);
      }

      // Send email
      await this.mailerService.sendMail({
        to: job.data.to,
        subject: job.data.subject,
        html,
      });

      this.logger.log(`Email sent successfully to ${job.data.to}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to send email to ${job.data.to}:`, message);
      throw error; // Rethrow to trigger retry mechanism
    }
  }
}
