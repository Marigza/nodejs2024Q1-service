import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import {
  FavsAlbumController,
  FavsArtistController,
  FavsController,
  FavsTrackController,
} from './favs.controller';

@Module({
  controllers: [
    FavsController,
    FavsTrackController,
    FavsAlbumController,
    FavsArtistController,
  ],
  providers: [FavsService],
})
export class FavsModule {}
