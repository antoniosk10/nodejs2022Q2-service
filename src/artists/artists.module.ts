import { Module } from '@nestjs/common';
import { TracksModule } from './../tracks/tracks.module';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  providers: [ArtistsService],
  controllers: [ArtistsController],
  imports: [TracksModule],
})
export class ArtistsModule {}
