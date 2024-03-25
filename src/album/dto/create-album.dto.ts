import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({
    example: 'AlbumName',
    description: 'album name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 2000,
    description: 'album year create',
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    example: 'ddeb27fb-d9a0-4624-be4d-4615062daed5',
    description: `album's artist`,
  })
  //@IsString()
  artistId: string | null; // refers to Artist
}
