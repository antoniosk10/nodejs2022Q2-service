import { Module, forwardRef } from '@nestjs/common';
import { TracksModule } from './../tracks/tracks.module';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { AlbumsModule } from './../albums/albums.module';
import { FavoritesModule } from './../favorites/favorites.module';
@Module({
  providers: [ArtistsService],
  controllers: [ArtistsController],
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavoritesModule),
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
