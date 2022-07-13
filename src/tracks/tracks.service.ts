import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  async getAll(): Promise<Track[]> {
    return this.tracks;
  }

  async getById(id: string): Promise<Track> {
    return this.tracks.find((track) => id === track.id);
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
    //TODO: delete from linked
    this.tracks = this.tracks.filter((track) => track.id !== id);
    return;
  }

  async update(id: string, trackDto: UpdateTrackDto): Promise<Track> {
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
}
