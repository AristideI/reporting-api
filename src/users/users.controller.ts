import { Body, Controller, Post } from '@nestjs/common';
import { NewUserDto } from './dtos/new-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: NewUserDto) {
    this.userService.create(body.email, body.password);
  }
}
