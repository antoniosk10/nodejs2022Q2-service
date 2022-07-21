import { Module, forwardRef } from '@nestjs/common';
import { FavoritesModule } from './../favorites/favorites.module';
import { TracksModule } from './../tracks/tracks.module';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
@Module({
  providers: [AlbumsService],
  controllers: [AlbumsController],
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([AlbumEntity]),
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
