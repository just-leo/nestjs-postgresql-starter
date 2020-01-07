import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Sign In' })
  @ApiResponse({ status: 200, description: 'You are successfully signed in' })
  async signIn(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.signIn(loginUserDto);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Sign Up' })
  @ApiResponse({ status: 201, description: 'You are successfully signed up' })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }
}
