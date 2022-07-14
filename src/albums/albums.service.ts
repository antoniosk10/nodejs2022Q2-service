import { Inject, Injectable } from '@nestjs/common';
import { TracksService } from 'src/tracks/tracks.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  @Inject(TracksService)
  private readonly tracksService: TracksService;

  async getAll(): Promise<Album[]> {
    return this.albums;
  }

  async getById(id: string): Promise<Album> {
    return this.albums.find((album) => id === album.id);
  }

  async create(albumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = {
      id: uuidv4(),
      ...albumDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  async remove(id: string): Promise<Album> {
    await this.tracksService.removeAlbums(id);
    this.albums = this.albums.filter((album) => album.id !== id);
    return;
  }

  async update(id: string, albumDto: UpdateAlbumDto): Promise<Album> {
    let updatedAlbum: Album | null = null;
    this.albums = this.albums.map((album) =>
      album.id === id
        ? (updatedAlbum = {
            ...album,
            ...albumDto,
          })
        : album,
    );
    return updatedAlbum;
  }
}
