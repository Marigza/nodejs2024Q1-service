import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { Artist } from './entities/artist.entity';
import { albums, artists } from 'src/dataBase/database';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const newArtist = new Artist({
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return artists;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const currentArtist = artists.find((artist) => artist.id === id);
    if (!currentArtist) {
      throw new HttpException(
        `artist with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return currentArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentArtist = artists.find((artist) => artist.id === id);

    if (!currentArtist) {
      throw new HttpException(
        `artist with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    currentArtist.name = updateArtistDto.name;
    currentArtist.grammy = updateArtistDto.grammy;

    return currentArtist;
  }

  remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentArtistIndex = artists.findIndex((artist) => artist.id === id);
    if (currentArtistIndex === -1) {
      throw new HttpException(
        `artist with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    albums.forEach((album) => {
      if (album.artistId === id) {
        return (album.artistId = null);
      }
      return album;
    });

    artists.splice(currentArtistIndex, 1);
    // TODO set track.artistId to NULL

    return `This action removes a #${id} artist`;
  }
}
