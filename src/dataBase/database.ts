import { Album } from 'src/album/entities/album.model';
import { ArtistModel } from 'src/artist/entities/artist.model';
import { Favorites } from 'src/favs/entities/fav.model';
import { Track } from 'src/track/entities/track.model';
import { UserModel } from 'src/user/entities/user.model';

export const users: UserModel[] = [];
export const artists: ArtistModel[] = [];
export const albums: Album[] = [];
export const tracks: Track[] = [];
export const favorites: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};
