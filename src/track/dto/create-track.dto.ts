import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({
    example: 'TrackName',
    description: 'track name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'ddeb27fb-d9a0-4624-be4d-4615062daed5',
    description: `track's artist`,
  })
  artistId: string | null;

  @ApiProperty({
    example: 'ddeb27fb-d9a0-4624-be4d-4615062daed5',
    description: `track's album`,
  })
  albumId: string | null;

  @ApiProperty({
    example: 256000,
    description: 'track duration',
  })
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
