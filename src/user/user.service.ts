import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from 'src/dataBase/database';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const createdData = Number(new Date());

    const newUser = new User({
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: createdData,
      updatedAt: createdData,
    });
    users.push(newUser);
    return newUser;
  }

  findAll() {
    return users;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const currentUser = users.find((user) => user.id === id);
    if (!currentUser) {
      throw new HttpException(
        `user with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return currentUser;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentUser = users.find((user) => user.id === id);

    if (!currentUser) {
      throw new HttpException(
        `user with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (updateUserDto.oldPassword === updateUserDto.newPassword) {
      throw new HttpException(
        `new user password must differ from old`,
        HttpStatus.FORBIDDEN,
      );
    }
    if (currentUser.password !== updateUserDto.oldPassword) {
      throw new HttpException(
        `old user password is wrong`,
        HttpStatus.FORBIDDEN,
      );
    }
    currentUser.password = updateUserDto.newPassword;
    currentUser.version++;
    currentUser.updatedAt = Number(new Date());
    return currentUser;
  }

  remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentUserIndex = users.findIndex((user) => user.id === id);
    if (currentUserIndex === -1) {
      throw new HttpException(
        `user with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    users.splice(currentUserIndex, 1);

    return `This action removes a #${id} user`;
  }
}
