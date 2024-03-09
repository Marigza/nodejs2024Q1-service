import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class Fav {
  @ApiProperty({
    example: [{}, {}],
    description: 'favorite artists',
  })
  artists: Artist[];

  @ApiProperty({
    example: [{}, {}],
    description: 'favorite albums',
  })
  albums: Album[];

  @ApiProperty({
    example: [{}, {}],
    description: 'favorite tracks',
  })
  tracks: Track[];

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
