import { AlbumModel } from './album.model';
import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Album implements AlbumModel {
  @ApiProperty({
    example: 'ddeb27fb-d9a0-4624-be4d-4615062daed4',
    description: 'Unique ID',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'AlbumName',
    description: 'album Name',
  })
  name: string;

  @ApiProperty({
    example: 2000,
    description: 'album year create',
  })
  year: number;

  @ApiProperty({
    example: 'ddeb27fb-d9a0-4624-be4d-4615062daed5',
    description: `album's Artist`,
  })
  artistId: string | null;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
