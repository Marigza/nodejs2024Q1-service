import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'oldSecret',
    description: 'previous user password',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password

  @ApiProperty({
    example: 'newSecret',
    description: 'new user password',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string; // new password
}
