import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { v4 as uuidv4 } from 'uuid';
import { TracksService } from './../tracks/tracks.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,

    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  private artists: Artist[] = [];

  async getAll(): Promise<Artist[]> {
    return this.artists;
  }

  async getById(id: string): Promise<Artist> {
    const artist = this.artists.find((artist) => id === artist.id);
    if (artist) return artist;
    throw new NotFoundException();
  }

  async create(artistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = {
      id: uuidv4(),
      ...artistDto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  async remove(id: string): Promise<Artist> {
    const artist = this.artists.find((artist) => id === artist.id);
    if (artist) {
      await this.tracksService.removeArtist(id);
      await this.albumsService.removeArtist(id);
      await this.favoritesService.removeArtist(id);
      this.artists = this.artists.filter((artist) => artist.id !== id);
      return;
    }
    throw new NotFoundException();
  }

  async update(id: string, artistDto: UpdateArtistDto): Promise<Artist> {
    const artist = this.artists.find((artist) => id === artist.id);
    if (artist) {
      let updatedArtist: Artist | null = null;
      this.artists = this.artists.map((artist) =>
        artist.id === id
          ? (updatedArtist = {
              ...artist,
              ...artistDto,
            })
          : artist,
      );
      return updatedArtist;
    }
    throw new NotFoundException();
  }
}
