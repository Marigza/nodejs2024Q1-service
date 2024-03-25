import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import { validate as uuidValidate } from 'uuid';

interface UserDataBase {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const createdData = Number(new Date());

    const newUser = new User({
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: createdData,
      updatedAt: createdData,
    });
    const userDataBase = {
      id: newUser.id,
      login: newUser.login,
      password: newUser.password,
      version: newUser.version,
      createdAt: new Date(newUser.createdAt),
      updatedAt: new Date(newUser.updatedAt),
    };
    const superUser = await this.prisma.user.create({ data: userDataBase });

    return this.exclude(superUser, ['password']);
  }

  async findAll() {
    const allUsers = await this.prisma.user.findMany();
    const usersWithoutPassword = allUsers.map((user) => {
      return this.exclude(user, ['password']);
    });
    const usersModified = usersWithoutPassword.map((user) => {
      const newUser: User = {
        id: user.id,
        login: user.login,
        password: user.password,
        version: user.version,
        createdAt: new Date(user.createdAt).getTime(),
        updatedAt: new Date(user.updatedAt).getTime(),
      };
      return newUser;
    });

    return usersModified;
  }

  async findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const currentUser = await this.prisma.user.findUnique({
        where: { id },
      });
      return this.exclude(currentUser, ['password']);
    } catch {
      throw new HttpException(
        `user with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const currentUser = await this.prisma.user.findUnique({ where: { id } });
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          password: updateUserDto.newPassword,
          version: {
            increment: 1,
          },
          updatedAt: new Date(),
        },
      });
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
      return this.exclude(updatedUser, ['password']);
    } catch (e) {
      throw new HttpException(
        `user with id=${id} doesn't exist ${e}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return; // `This action removes a #${id} user`;
    } catch (e) {
      throw new HttpException(
        `user with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  private exclude(user: UserDataBase, keys: string[]) {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key)),
    );
  }
}
