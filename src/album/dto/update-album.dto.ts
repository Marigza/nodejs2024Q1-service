import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
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
  artistId: string | null; // refers to Artist
}
