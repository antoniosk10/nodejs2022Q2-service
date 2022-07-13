import { Injectable } from '@nestjs/common';
import { Favorites } from './interfaces/favorite.interface';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = { tracks: [], albums: [], artists: [] };

  async getAll(): Promise<Favorites> {
    return this.favorites;
  }

  async addTrack(id: string): Promise<Favorites> {
    this.favorites.tracks.push(id);
    return this.favorites;
  }

  async removeTrack(id: string): Promise<Favorites> {
    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
    return this.favorites;
  }

  async addAlbum(id: string): Promise<Favorites> {
    this.favorites.albums.push(id);
    return this.favorites;
  }

  async removeAlbum(id: string): Promise<Favorites> {
    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
    return this.favorites;
  }

  async addArtist(id: string): Promise<Favorites> {
    this.favorites.artists.push(id);
    return this.favorites;
  }

  async removeArtist(id: string): Promise<Favorites> {
    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
    return this.favorites;
  }
}
