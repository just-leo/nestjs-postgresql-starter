import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiHeader,
} from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiHeader({
  name: 'Authorization',
  description: 'Auth token',
})
@ApiTags('user')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getList(@Query() query) {
    return await this.userService.findAll(query);
  }
}
