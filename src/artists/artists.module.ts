import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from './../albums/albums.module';
import { FavoritesModule } from './../favorites/favorites.module';
import { TracksModule } from './../tracks/tracks.module';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  providers: [ArtistsService],
  controllers: [ArtistsController],
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([ArtistEntity]),
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
