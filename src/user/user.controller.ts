import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'create user' })
  @ApiResponse({ status: 201, type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'get user with ID' })
  @ApiResponse({ status: 200, type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'update user password' })
  @ApiResponse({ status: 200, type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'delete user with ID' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
