import { User } from '@virtual-library/models';
import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TransformInterceptor } from '../../api-response.interceptor';

@Controller('auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/list')
  async listAllUsers() {
    return await this.authService.listAllUsers();
  }

  @Post('/register')
  @UseInterceptors(TransformInterceptor)
  async CreateUser(@Body() user:User ) {
    return await this.authService.createUser(user);
  }
}
