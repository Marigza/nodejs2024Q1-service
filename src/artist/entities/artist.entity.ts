import { ArtistModel } from './artist.model';
import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Artist implements ArtistModel {
  @ApiProperty({
    example: 'ddeb27fb-d9a0-4624-be4d-4615062daed4',
    description: 'Unique ID',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'ArtistName',
    description: 'artist Name',
  })
  name: string;

  @ApiProperty({
    example: true,
    description: 'grammy awards is existing',
  })
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
