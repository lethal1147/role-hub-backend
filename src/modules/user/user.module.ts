import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { R2Module } from 'src/shared/services/r2/r2.module';
import { EmailModule } from 'src/shared/services/email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), R2Module, EmailModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
