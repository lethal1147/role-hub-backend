import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { responseHandler } from 'src/shared/handlers/response.handler';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
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
