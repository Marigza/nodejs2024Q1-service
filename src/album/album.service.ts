import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { Album } from './entities/album.entity';
import { albums, favorites, tracks } from 'src/dataBase/database';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new Album({
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId ?? null,
    });
    albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return albums;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const currentAlbum = albums.find((album) => album.id === id);
    if (!currentAlbum) {
      throw new HttpException(
        `album with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return currentAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentAlbum = albums.find((album) => album.id === id);

    if (!currentAlbum) {
      throw new HttpException(
        `album with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    currentAlbum.name = updateAlbumDto.name;
    currentAlbum.year = updateAlbumDto.year;
    currentAlbum.artistId = updateAlbumDto.artistId;

    return currentAlbum;
  }

  remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentAlbumIndex = albums.findIndex((album) => album.id === id);
    if (currentAlbumIndex === -1) {
      throw new HttpException(
        `album with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    tracks.forEach((track) => {
      if (track.albumId === id) {
        return (track.albumId = null);
      }
      return track;
    });

    const favAlbums = favorites.albums.filter((album) => album.id !== id);

    favorites.albums = favAlbums;

    albums.splice(currentAlbumIndex, 1);

    return `This action removes a #${id} album`;
  }
}
