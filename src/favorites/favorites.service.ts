import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TracksService } from 'src/tracks/tracks.service';
import { Repository } from 'typeorm';
import { AlbumsService } from './../albums/albums.service';
import { AlbumEntity } from './../albums/entities/album.entity';
import { ArtistsService } from './../artists/artists.service';
import { ArtistEntity } from './../artists/entities/artist.entity';
import { TrackEntity } from './../tracks/entities/track.entity';
import {
  FavoriteEntity,
  FavoriteEntityResult,
} from './entities/favorite.entity';

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
        artists: [],
        albums: [],
        tracks: [],
      }),
    );

    return favs.id;
  }

  async getUserFavs(): Promise<FavoriteEntityResult> {
    const favsId = await this.getFavsId();
    const favs = await this.favoriteRepository.findOne({
      where: { id: favsId },
    });
    const tracks: TrackEntity[] = await Promise.allSettled(
      favs.tracks.map((trackId) => this.tracksService.getById(trackId)),
    ).then((res) =>
      res.map((item) => (item as unknown as PromiseFulfilledResult<any>).value),
    );
    const albums: AlbumEntity[] = await Promise.allSettled(
      favs.albums.map((albumId) => this.albumsService.getById(albumId)),
    ).then((res) =>
      res.map((item) => (item as unknown as PromiseFulfilledResult<any>).value),
    );
    const artists: ArtistEntity[] = await Promise.allSettled(
      favs.artists.map((artistId) => this.artistsService.getById(artistId)),
    ).then((res) =>
      res.map((item) => (item as unknown as PromiseFulfilledResult<any>).value),
    );
    return { ...favs, artists, albums, tracks };
  }

  async addTrack(id: string): Promise<void> {
    try {
      const track = await this.tracksService.getById(id);
      const favsId = await this.getFavsId();
      const favs = await this.favoriteRepository.findOne({
        where: { id: favsId },
      });

      await this.favoriteRepository.save(
        this.favoriteRepository.create({
          ...favs,
          tracks: [...new Set([...favs.tracks, track.id])],
        }),
      );
      return;
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async removeTrack(id: string): Promise<void> {
    const favsId = await this.getFavsId();

    const favs = await this.favoriteRepository.findOne({
      where: { id: favsId },
    });

    const updatedTrackId = favs.tracks.filter((idTrack) => idTrack !== id);

    await this.favoriteRepository.save(
      this.favoriteRepository.create({
        ...favs,
        tracks: updatedTrackId,
      }),
    );
    return;
  }

  async addArtist(id: string): Promise<void> {
    try {
      const favsId = await this.getFavsId();
      const artist = await this.artistsService.getById(id);
      const favs = await this.favoriteRepository.findOne({
        where: { id: favsId },
      });
      await this.favoriteRepository.save(
        this.favoriteRepository.create({
          ...favs,
          artists: [...new Set([...favs.artists, artist.id])],
        }),
      );
      return;
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async removeArtist(id: string): Promise<void> {
    const favsId = await this.getFavsId();
    const favs = await this.favoriteRepository.findOne({
      where: { id: favsId },
    });

    const updatedArtistId = favs.artists.filter((idArtist) => idArtist !== id);

    await this.favoriteRepository.save(
      this.favoriteRepository.create({
        ...favs,
        artists: updatedArtistId,
      }),
    );
    return;
  }

  async addAlbum(id: string): Promise<void> {
    try {
      const favsId = await this.getFavsId();
      const album = await this.albumsService.getById(id);
      const favs = await this.favoriteRepository.findOne({
        where: { id: favsId },
      });

      await this.favoriteRepository.save(
        this.favoriteRepository.create({
          ...favs,
          albums: [...new Set([...favs.albums, album.id])],
        }),
      );
      return;
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async removeAlbum(id: string): Promise<void> {
    const favsId = await this.getFavsId();
    const favs = await this.favoriteRepository.findOne({
      where: { id: favsId },
    });

    const updatedTrackId = favs.albums.filter((idAlbum) => idAlbum !== id);

    await this.favoriteRepository.save(
      this.favoriteRepository.create({
        ...favs,
        albums: updatedTrackId,
      }),
    );
    return;
  }
}
