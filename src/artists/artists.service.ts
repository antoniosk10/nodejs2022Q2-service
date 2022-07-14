import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { TracksService } from './../tracks/tracks.service';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  @Inject(TracksService)
  private readonly tracksService: TracksService;

  async getAll(): Promise<Artist[]> {
    return this.artists;
  }

  async getById(id: string): Promise<Artist> {
    return this.artists.find((artist) => id === artist.id);
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
    await this.tracksService.removeArtist(id);
    this.artists = this.artists.filter((artist) => artist.id !== id);
    return;
  }

  async update(id: string, artistDto: UpdateArtistDto): Promise<Artist> {
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
}
