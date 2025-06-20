import { Body, Controller, Get, Post } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return this.userService.findAll();
  }

  @Post('create')
  async createUser(@Body() body: { username: string; password: string }) {
    return this.userService.createUser(body.username, body.password);
  }
}
