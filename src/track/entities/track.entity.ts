import { TrackModel } from './track.model';
import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Track implements TrackModel {
  @ApiProperty({
    example: 'ddeb27fb-d9a0-4624-be4d-4615062daed4',
    description: 'Unique ID',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'TrackName',
    description: 'track Name',
  })
  name: string;

  @ApiProperty({
    example: 'ddeb27fb-d9a0-4624-be4d-4615062daed5',
    description: `track's Artist`,
  })
  artistId: string | null;

  @ApiProperty({
    example: 'ddeb27fb-d9a0-4624-be4d-4615062daed5',
    description: `track's Album`,
  })
  albumId: string | null;

  @ApiProperty({
    example: 256000,
    description: `track's duration`,
  })
  duration: number;

  constructor(required: Required<Track>) {
    Object.assign(this, required);
  }
}
