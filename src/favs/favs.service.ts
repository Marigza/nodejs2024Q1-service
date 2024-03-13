import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { albums, artists, favorites, tracks } from 'src/dataBase/database';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class FavsService {
  findAll() {
    return favorites;
  }

  removeTrackFromFavs(id: string) {
    this.checkIdIsUUID(id);

    const trackIndex = favorites.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      this.throw404Exception(id);
    }

    favorites.tracks.splice(trackIndex, 1);

    return `This action removes a track with #${id} from favs`;
  }

  addTrackToFavs(id: string) {
    this.checkIdIsUUID(id);

    const newFavTrack = tracks.find((track) => track.id === id);
    if (!newFavTrack) {
      this.throw422Exception(id);
    }
    favorites.tracks.push(newFavTrack);

    return `This action add a track with #${id} to favs`;
  }

  addAlbumToFavs(id: string) {
    this.checkIdIsUUID(id);

    const newFavAlbum = albums.find((album) => album.id === id);
    if (!newFavAlbum) {
      this.throw422Exception(id);
    }
    favorites.albums.push(newFavAlbum);

    return `This action add an album with #${id} to favs`;
  }

  removeAlbumFromFavs(id: string) {
    this.checkIdIsUUID(id);

    const albumIndex = favorites.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      this.throw404Exception(id);
    }

    favorites.albums.splice(albumIndex, 1);

    return `This action removes an album with #${id} from favs`;
  }

  addArtistToFavs(id: string) {
    this.checkIdIsUUID(id);

    const newFavArtist = artists.find((artist) => artist.id === id);
    if (!newFavArtist) {
      this.throw422Exception(id);
    }
    favorites.artists.push(newFavArtist);

    return `This action add an artist with #${id} to favs`;
  }

  removeArtistFromFavs(id: string) {
    this.checkIdIsUUID(id);

    const artistIndex = favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (artistIndex === -1) {
      this.throw404Exception(id);
    }
    const filteredArtists = favorites.artists.filter(
      (artist) => artist.id !== id,
    );

    favorites.artists = filteredArtists ?? [];

    return `This action removes an artist with #${id} from favs`;
  }

  private checkIdIsUUID(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Id is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private throw422Exception(id: string) {
    throw new HttpException(
      `entity with id=${id} doesn't exist`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  private throw404Exception(id: string) {
    throw new HttpException(
      `entity with id=${id} doesn't favorite`,
      HttpStatus.NOT_FOUND,
    );
  }
}
