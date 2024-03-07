import { Album } from 'src/album/entities/album.model';
import { Artist } from 'src/artist/entities/artist.model';
import { Favorites } from 'src/favs/entities/fav.model';
import { Track } from 'src/track/entities/track.model';
import { User } from 'src/user/entities/user.model';

export const users: User[] = [];
export const artists: Artist[] = [];
export const albums: Album[] = [];
export const tracks: Track[] = [];
export const favorites: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};
