import { AlbumModel } from 'src/album/entities/album.model';
import { ArtistModel } from 'src/artist/entities/artist.model';
import { FavoritesResponse } from 'src/favs/entities/fav.model';
import { TrackModel } from 'src/track/entities/track.model';
import { UserModel } from 'src/user/entities/user.model';

export const users: UserModel[] = [];
export const artists: ArtistModel[] = [];
export const albums: AlbumModel[] = [];
export const tracks: TrackModel[] = [];
export const favorites: FavoritesResponse = {
  artists: [],
  albums: [],
  tracks: [],
};
