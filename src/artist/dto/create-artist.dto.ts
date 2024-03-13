import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({
    example: 'ArtistName',
    description: 'Artist name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: true,
    description: 'grammy awards is existing',
  })
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
