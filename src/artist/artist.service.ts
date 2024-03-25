import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { Artist } from './entities/artist.entity';
import { favorites } from 'src/dataBase/database';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = new Artist({
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    return await this.prisma.artist.create({ data: newArtist });
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const currentArtist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!currentArtist) {
      throw new HttpException(
        `artist with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return currentArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.prisma.artist.update({
        where: { id },
        data: {
          name: updateArtistDto.name,
          grammy: updateArtistDto.grammy,
        },
      });
    } catch {
      throw new HttpException(
        `artist with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'artistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.prisma.artist.delete({
        where: { id },
      });

      await this.prisma.album.updateMany({
        where: {
          artistId: id,
        },
        data: {
          artistId: null,
        },
      });

      await this.prisma.track.updateMany({
        where: {
          artistId: id,
        },
        data: {
          artistId: null,
        },
      });

      const favArtists = favorites.artists.filter((artist) => artist.id !== id);

      favorites.artists = favArtists;

      return;
    } catch {
      throw new HttpException(
        `artist with id=${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
