import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import {
  FavsAlbumController,
  FavsArtistController,
  FavsController,
  FavsTrackController,
} from './favs.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [
    FavsController,
    FavsTrackController,
    FavsAlbumController,
    FavsArtistController,
  ],
  providers: [FavsService],
  imports: [PrismaModule],
})
export class FavsModule {}
