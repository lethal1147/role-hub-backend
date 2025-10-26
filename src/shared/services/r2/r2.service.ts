import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import r2Config from 'src/config/r2/r2.config';
import { R2_CATEGORY_NAME } from './r2.constant';

@Injectable()
export class R2Service {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor() {
    this.s3Client = new S3Client(r2Config());
    this.bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME!;
  }

  /**
   *
   * @param {
   * filename: string;
   * fileExt: string;
   * category: R2_CATEGORY_NAME;
   * body: Buffer;
   * contentType: string;
   * }
   * Using for upload file to R2 bucket
   */
  async uploadFile({
    filename,
    category,
    body,
    contentType,
  }: {
    filename: string;
    category: R2_CATEGORY_NAME;
    body: Buffer;
    contentType: string;
  }) {
    const key = this.generateKey(filename, category);
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
      ContentDisposition: 'inline',
    };
    const command = new PutObjectCommand(params);
    await this.s3Client.send(command);
    const publicUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${this.bucketName}/${key}`;
    return publicUrl;
  }

  generateKey(filename: string, category: R2_CATEGORY_NAME) {
    return `${category}/${Date.now()}-${filename}`;
  }
}
