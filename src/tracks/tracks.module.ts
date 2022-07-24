import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesModule } from './../favorites/favorites.module';
import { TrackEntity } from './entities/track.entity';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  providers: [TracksService],
  controllers: [TracksController],
  exports: [TracksService],
  imports: [
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([TrackEntity]),
  ],
})
export class TracksModule {}
