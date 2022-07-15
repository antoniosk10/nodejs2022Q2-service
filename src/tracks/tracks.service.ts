import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from 'src/favorites/favorites.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TracksService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  private tracks: Track[] = [];

  async getAll(): Promise<Track[]> {
    return this.tracks;
  }

  async getById(id: string): Promise<Track> {
    const track = this.tracks.find((track) => id === track.id);
    if (track) return track;
    throw new NotFoundException();
  }

  async create(trackDto: CreateTrackDto): Promise<Track> {
    const newTrack = {
      id: uuidv4(),
      ...trackDto,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  async remove(id: string): Promise<Track> {
    const track = this.tracks.find((track) => id === track.id);
    if (track) {
      await this.favoritesService.removeTrack(id);
      this.tracks = this.tracks.filter((track) => track.id !== id);
      return;
    }
    throw new NotFoundException();
  }

  async update(id: string, trackDto: UpdateTrackDto): Promise<Track> {
    const track = this.tracks.find((track) => id === track.id);
    if (track) {
      let updatedTrack: Track | null = null;
      this.tracks = this.tracks.map((track) =>
        track.id === id
          ? (updatedTrack = {
              ...track,
              ...trackDto,
            })
          : track,
      );
      return updatedTrack;
    }
    throw new NotFoundException();
  }

  async removeArtist(id: string): Promise<void> {
    this.tracks = this.tracks.map((track) =>
      track.artistId === id ? { ...track, artistId: null } : track,
    );
    return;
  }

  async removeAlbums(id: string): Promise<void> {
    this.tracks = this.tracks.map((track) =>
      track.albumId === id ? { ...track, albumId: null } : track,
    );
    return;
  }
}
