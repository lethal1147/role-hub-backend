import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { TypeOrmConfigService } from './config/database/database.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './shared/interceptors/logger.interceptor';
import { MulterModule } from '@nestjs/platform-express';
import { BullModule } from '@nestjs/bullmq';
import { join } from 'path';
import { getQueueConfig } from './config/queue/queue.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getQueueConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    MulterModule.register({
      dest: join(__dirname, '..', 'uploads'),
    }),
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export class AppModule {
  constructor() {}
}
