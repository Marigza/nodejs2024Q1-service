import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { Track } from './entities/track.entity';
import { favorites, tracks } from 'src/dataBase/database';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const newTrack = new Track({
      id: uuidv4(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      artistId: createTrackDto.artistId ?? null,
      albumId: createTrackDto.albumId ?? null,
    });
    tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return tracks;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const currentTrack = tracks.find((track) => track.id === id);
    if (!currentTrack) {
      throw new HttpException(
        `track with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return currentTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentTrack = tracks.find((track) => track.id === id);

    if (!currentTrack) {
      throw new HttpException(
        `track with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    currentTrack.name = updateTrackDto.name;
    currentTrack.duration = updateTrackDto.duration;
    currentTrack.artistId = updateTrackDto.artistId;
    currentTrack.albumId = updateTrackDto.albumId;

    return currentTrack;
  }

  remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'trackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentTrackIndex = tracks.findIndex((track) => track.id === id);
    if (currentTrackIndex === -1) {
      throw new HttpException(
        `track with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    const favTracks = favorites.tracks.filter((track) => track.id !== id);

    favorites.tracks = favTracks;

    tracks.splice(currentTrackIndex, 1);

    return `This action removes a #${id} track`;
  }
}
