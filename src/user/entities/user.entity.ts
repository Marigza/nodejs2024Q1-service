import { Exclude } from 'class-transformer';
import { UserModel } from './user.model';
import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class User implements UserModel {
  @ApiProperty({
    example: 'ddeb27fb-d9a0-4624-be4d-4615062daed4',
    description: 'Unique ID',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'userName',
    description: 'user Name',
  })
  login: string;

  @ApiProperty({
    example: 1,
    description: 'version of updating user',
  })
  version: number;

  @ApiProperty({
    example: 123123123123,
    description: 'timestamp of creating user',
  })
  createdAt: number;

  @ApiProperty({
    example: 123123123123,
    description: 'timestamp of updating user',
  })
  updatedAt: number;

  @ApiProperty({
    example: 'secretPassword',
    description: 'user password',
  })
  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
