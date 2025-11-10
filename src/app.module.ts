import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './config/database/database.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './shared/interceptors/logger.interceptor';
import { MulterModule } from '@nestjs/platform-express';
import { BullModule } from '@nestjs/bullmq';
import { join } from 'path';
import { getQueueConfig } from './config/queue/queue.config';
import { BullBoardConfigModule } from './config/bullboard/bullboard.module';
import { PublicModule } from './modules/public/public.module';
// import { AdminModule } from './modules/admin/admin.module';

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
    MulterModule.register({
      dest: join(__dirname, '..', 'uploads'),
    }),
    BullBoardConfigModule,
    PublicModule,
    // AdminModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export class AppModule {
  constructor() {}
}
