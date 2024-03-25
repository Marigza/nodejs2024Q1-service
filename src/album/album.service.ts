import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { Album } from './entities/album.entity';
import { favorites } from 'src/dataBase/database';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new Album({
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId ?? null,
    });
    return await this.prisma.album.create({ data: newAlbum });
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const currentAlbum = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!currentAlbum) {
      throw new HttpException(
        `album with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return currentAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.prisma.album.update({
        where: { id },
        data: {
          name: updateAlbumDto.name,
          year: updateAlbumDto.year,
          artistId: updateAlbumDto.artistId,
        },
      });
    } catch {
      throw new HttpException(
        `album with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'albumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.prisma.album.delete({
        where: { id },
      });

      await this.prisma.track.updateMany({
        where: {
          albumId: id,
        },
        data: {
          albumId: null,
        },
      });

      const favAlbums = favorites.albums.filter((album) => album.id !== id);

      favorites.albums = favAlbums;

      return;
    } catch {
      throw new HttpException(
        `album with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
