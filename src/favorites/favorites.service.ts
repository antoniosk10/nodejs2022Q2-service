import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from './../albums/albums.service';
import { ArtistsService } from './../artists/artists.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,

    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,

    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,

    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>,
  ) {}

  async getFavsId(): Promise<string> {
    const favsAll = await this.favoriteRepository.find();

    if (favsAll.length) {
      return favsAll[0].id;
    }
    const favs = await this.favoriteRepository.save(
      this.favoriteRepository.create({
        artistId: [],
        albumId: [],
        trackId: [],
      }),
    );

    return favs.id;
  }

  async getUserFavs(): Promise<FavoriteEntity> {
    const favsId = await this.getFavsId();
    const favs = await this.favoriteRepository.findOne({
      where: { id: favsId },
    });
    //TODO: return objects
    return favs;
  }

  async addTrack(id: string): Promise<void> {
    const track = await this.tracksService.getById(id);
    const favsId = await this.getFavsId();
    const favs = await this.favoriteRepository.findOne({
      where: { id: favsId },
    });

    if (track) {
      await this.favoriteRepository.save(
        this.favoriteRepository.create({
          ...favs,
          trackId: [...favs.trackId, track.id],
        }),
      );
    }
    throw new UnprocessableEntityException();
  }

  async removeTrack(id: string): Promise<void> {
    const favsId = await this.getFavsId();

    const favs = await this.favoriteRepository.findOne({
      where: { id: favsId },
    });

    const updatedTrackId = favs.trackId.filter((idTrack) => idTrack !== id);

    await this.favoriteRepository.save(
      this.favoriteRepository.create({
        ...favs,
        trackId: updatedTrackId,
      }),
    );
  }

  async addArtist(id: string): Promise<void> {
    const favsId = await this.getFavsId();
    const artist = await this.artistsService.getById(id);
    const favs = await this.favoriteRepository.findOne({
      where: { id: favsId },
    });

    if (artist) {
      await this.favoriteRepository.save(
        this.favoriteRepository.create({
          ...favs,
          artistId: [...favs.artistId, artist.id],
        }),
      );
    }
    throw new UnprocessableEntityException();
  }

  async removeArtist(id: string): Promise<void> {
    const favsId = await this.getFavsId();
    const favs = await this.favoriteRepository.findOne({
      where: { id: favsId },
    });

    const updatedArtistId = favs.artistId.filter((idArtist) => idArtist !== id);

    await this.favoriteRepository.save(
      this.favoriteRepository.create({
        ...favs,
        artistId: updatedArtistId,
      }),
    );
  }

  async addAlbum(id: string): Promise<void> {
    const favsId = await this.getFavsId();
    const album = await this.albumsService.getById(id);
    const favs = await this.favoriteRepository.findOne({
      where: { id: favsId },
    });

    if (album) {
      await this.favoriteRepository.save(
        this.favoriteRepository.create({
          ...favs,
          albumId: [...favs.albumId, album.id],
        }),
      );
    }
    throw new UnprocessableEntityException();
  }

  async removeAlbum(id: string): Promise<void> {
    const favsId = await this.getFavsId();
    const favs = await this.favoriteRepository.findOne({
      where: { id: favsId },
    });

    const updatedTrackId = favs.albumId.filter((idAlbum) => idAlbum !== id);

    await this.favoriteRepository.save(
      this.favoriteRepository.create({
        ...favs,
        trackId: updatedTrackId,
      }),
    );
  }
}
