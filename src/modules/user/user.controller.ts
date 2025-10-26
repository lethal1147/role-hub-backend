import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { responseHandler } from 'src/shared/handlers/response.handler';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterDto } from './dto/register.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RegisterBody } from './types/user.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profileImage'))
  async register(
    @Body('data') jsonData: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const parsedData = JSON.parse(jsonData) as RegisterBody;
    const registerDto = plainToInstance(RegisterDto, parsedData);

    const errors = await validate(registerDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const data = await this.userService.register(registerDto, file);
    return responseHandler({
      success: true,
      statusCode: 201,
      message: 'Registered',
      data,
    });
  }

  @Get()
  @HttpCode(200)
  getAllUser() {
    const data = this.userService.getAllUser();
    return responseHandler({
      success: true,
      statusCode: 200,
      message: 'Get all users',
      data,
    });
  }
}
