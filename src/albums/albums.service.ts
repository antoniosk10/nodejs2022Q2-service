import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Repository } from 'typeorm';
import { AlbumDto } from './dto/album.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,

    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async getById(id: string): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (album) return album;
    throw new NotFoundException();
  }

  async create(albumDto: AlbumDto): Promise<AlbumEntity> {
    const album = this.albumRepository.create(albumDto);
    return (await this.albumRepository.save(album)).toResponse();
  }

  async remove(id: string): Promise<void> {
    const result = await this.albumRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    await this.tracksService.removeAlbums(id);
    await this.favoritesService.removeAlbum(id);
  }

  async update(id: string, albumDto: AlbumDto): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (album) {
      return (
        await this.albumRepository.save(
          this.albumRepository.create({
            ...album,
            ...albumDto,
          }),
        )
      ).toResponse();
    }
    throw new NotFoundException();
  }

  async removeArtist(id: string): Promise<void> {
    const albums = await this.getAll();
    albums.forEach(
      (album) =>
        album.artistId === id && this.update(id, { ...album, artistId: null }),
    );
    return;
  }
}
