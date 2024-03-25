import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { Track } from './entities/track.entity';
import { favorites } from 'src/dataBase/database';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = new Track({
      id: uuidv4(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      artistId: createTrackDto.artistId ?? null,
      albumId: createTrackDto.albumId ?? null,
    });

    return await this.prisma.track.create({ data: newTrack });
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentTrack = await this.prisma.track.findUnique({ where: { id } });

    if (!currentTrack) {
      throw new HttpException(
        `track with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return currentTrack;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      return await this.prisma.track.update({
        where: { id },
        data: {
          name: updateTrackDto.name,
          duration: updateTrackDto.duration,
          artistId: updateTrackDto.artistId,
          albumId: updateTrackDto.albumId,
        },
      });
    } catch {
      throw new HttpException(
        `track with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.prisma.track.delete({
        where: { id },
      });
      const favTracks = favorites.tracks.filter((track) => track.id !== id);
      favorites.tracks = favTracks;
      return;
    } catch {
      throw new HttpException(
        `track with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
