import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'userName',
    description: 'user login',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: 'secretKey',
    description: 'user password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
