import { Exclude } from 'class-transformer';
import { UserModel } from './user.model';
import { IsUUID } from 'class-validator';

export class User implements UserModel {
  @IsUUID()
  id: string;

  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
